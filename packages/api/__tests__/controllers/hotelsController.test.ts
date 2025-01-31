import request from "supertest";
import express from "express";
import hotelsController from "../../controllers/hotelsController";
import hotelsServices from "../../services/hotelsServices";

jest.mock("../../services/hotelsServices");

const app = express();
app.use(express.json());

// register routes for testing
app.get("/api/hotels", hotelsController.gets);
app.get("/api/hotels/:id", hotelsController.get);

describe("hotelsController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Hotels API - GET /api/hotels", () => {
    const mockHotels = [
      {
        _id: "679a1b347919ddf3bfe51e07",
        chain_name: "Prince Hotels",
        hotel_name: "Grand Prince Hotel Shin Takanawa",
        addressline1: "3-13-1 Takanawa, Minato-ku",
        addressline2: "",
        zipcode: "108-8612",
        city: "Tokyo",
        state: "Tokyo",
        country: "Japan",
        countryisocode: "JP",
        star_rating: 4,
        createdAt: "2025-01-29T12:12:36.614Z",
        updatedAt: "2025-01-29T12:12:36.614Z",
      },
      {
        _id: "679a1b347919ddf3bfe51e00",
        chain_name: "Tokyu Hotels",
        hotel_name: "Kobe Sannomiya Tokyu REI Hotel",
        addressline1: "6-1-5 Kumoidori, Chuo-ku",
        addressline2: "",
        zipcode: "651-0096",
        city: "Kobe",
        state: "Hyogo",
        country: "Japan",
        countryisocode: "JP",
        star_rating: 3,
        createdAt: "2025-01-29T12:12:36.613Z",
        updatedAt: "2025-01-29T12:12:36.613Z",
      },
    ];
    it("should return a list of hotels with a 200 status", async () => {
      jest.spyOn(hotelsServices, "gets").mockResolvedValue(mockHotels as any);

      const res = await request(app).get("/api/hotels");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockHotels);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("should return an empty array when no hotels are found", async () => {
      jest.spyOn(hotelsServices, "gets").mockResolvedValue([]);

      const res = await request(app).get("/api/hotels");

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(0);
    });

    it("should return a 500 error if the service fails", async () => {
      jest
        .spyOn(hotelsServices, "gets")
        .mockRejectedValue(new Error("Database error"));

      const res = await request(app).get("/api/hotels");

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error");
    });
  });

  describe("Hotels API - GET /api/hotels/:id", () => {
    const mockHotel = {
      _id: "679a1b347919ddf3bfe51e07",
      chain_name: "Prince Hotels",
      hotel_name: "Grand Prince Hotel Shin Takanawa",
      addressline1: "3-13-1 Takanawa, Minato-ku",
      addressline2: "",
      zipcode: "108-8612",
      city: "Tokyo",
      state: "Tokyo",
      country: "Japan",
      countryisocode: "JP",
      star_rating: 4,
      createdAt: "2025-01-29T12:12:36.614Z",
      updatedAt: "2025-01-29T12:12:36.614Z",
    };

    it("should return a hotel by ID with a 200 status", async () => {
      jest.spyOn(hotelsServices, "get").mockResolvedValue(mockHotel as any);

      const res = await request(app).get(`/api/hotels/${mockHotel._id}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockHotel);
    });

    it("should return a 404 error if the hotel is not found", async () => {
      jest
        .spyOn(hotelsServices, "get")
        .mockRejectedValue(new Error("Hotel not found"));

      const res = await request(app).get("/api/hotels/unknown-id");

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
  });
});
