import hotelsServices from "../../services/hotelsServices";
import hotelModel from "../../models/hotelModel";
import { ERROR_MESSAGES } from "../../constants/defaultValues";
import { get, set } from "../../redis/redis";

jest.mock("../../models/hotelModel");
jest.mock("../../redis/redis", () => ({
  get: jest.fn(),
  set: jest.fn(),
}));

describe("hotelsService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("hotelsServices.gets", () => {
    it("should return a list of hotels matching the filter", async () => {
      const mockHotels = [
        {
          _id: "679a1b347919ddf3bfe51e07",
          chain_name: "Prince Hotels",
          hotel_name: "Grand Prince Hotel Shin Takanawa",
          city: "Tokyo",
          country: "Japan",
          createdAt: new Date(),
        },
        {
          _id: "679a1b347919ddf3bfe51e00",
          chain_name: "Tokyu Hotels",
          hotel_name: "Kobe Sannomiya Tokyu REI Hotel",
          city: "Kobe",
          country: "Japan",
          createdAt: new Date(),
        },
      ];

      (hotelModel.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockHotels),
      });

      const queryData = { filter: "Japan" };
      const result = await hotelsServices.gets(queryData);

      expect(hotelModel.find).toHaveBeenCalledWith({
        $or: [
          { hotel_name: expect.any(RegExp) },
          { country: expect.any(RegExp) },
          { city: expect.any(RegExp) },
          { chain_name: expect.any(RegExp) },
        ],
      });

      expect(result).toEqual(mockHotels);
    });

    it("should return all hotels when no filter is provided", async () => {
      const mockHotels = [
        {
          _id: "679a1b347919ddf3bfe51e07",
          chain_name: "Prince Hotels",
          hotel_name: "Grand Prince Hotel Shin Takanawa",
          city: "Tokyo",
          country: "Japan",
          createdAt: new Date(),
        },
      ];

      (hotelModel.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockHotels),
      });

      const result = await hotelsServices.gets({ filter: "" });

      expect(hotelModel.find).toHaveBeenCalledWith({});
      expect(result).toEqual(mockHotels);
    });

    it("should handle errors gracefully", async () => {
      (hotelModel.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockRejectedValue(new Error("Database error")),
      });

      await expect(hotelsServices.gets({ filter: "Japan" })).rejects.toThrow(
        "Database error"
      );
    });
  });

  describe("hotelsServices.get", () => {
    const mockHotel = {
      _id: "679a1b347919ddf3bfe51e07",
      chain_name: "Prince Hotels",
      hotel_name: "Grand Prince Hotel Shin Takanawa",
      city: "Tokyo",
      country: "Japan",
      createdAt: "2025-01-29T12:12:36.614Z",
      updatedAt: "2025-01-29T12:12:36.614Z",
    };

    it("should return a hotel from Redis cache if available", async () => {
      (get as jest.Mock).mockResolvedValue(mockHotel);

      const result = await hotelsServices.get(mockHotel._id);

      expect(get).toHaveBeenCalledWith(
        `${process.env.HOTEL_REDIS_KEY}-${mockHotel._id}`
      );
      expect(hotelModel.findById).not.toHaveBeenCalled(); // Shouldn't query DB if cached
      expect(result).toEqual(mockHotel);
    });

    it("should return a hotel from DB if not in Redis cache and store it in Redis", async () => {
      (get as jest.Mock).mockResolvedValue(null);
      (hotelModel.findById as jest.Mock).mockResolvedValue(mockHotel);

      const result = await hotelsServices.get(mockHotel._id);

      expect(get).toHaveBeenCalledWith(
        `${process.env.HOTEL_REDIS_KEY}-${mockHotel._id}`
      );
      expect(hotelModel.findById).toHaveBeenCalledWith(mockHotel._id);
      expect(set).toHaveBeenCalledWith(
        `${process.env.HOTEL_REDIS_KEY}-${mockHotel._id}`,
        mockHotel,
        parseInt(`${process.env.REDIS_EXPIRY_TIME}`)
      );
      expect(result).toEqual(mockHotel);
    });

    it("should throw an error if the hotel is not found in DB", async () => {
      (get as jest.Mock).mockResolvedValue(null);
      (hotelModel.findById as jest.Mock).mockResolvedValue(null);

      await expect(hotelsServices.get("unknown-id")).rejects.toThrow(
        ERROR_MESSAGES.HOTEL_NOT_FOUND
      );
    });

    it("should handle database errors gracefully", async () => {
      (get as jest.Mock).mockResolvedValue(null);
      (hotelModel.findById as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      await expect(hotelsServices.get(mockHotel._id)).rejects.toThrow(
        "Database error"
      );
    });
  });
});
