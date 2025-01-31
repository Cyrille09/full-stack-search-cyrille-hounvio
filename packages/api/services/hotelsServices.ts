import { get, set } from "../redis/redis";
import { ERROR_MESSAGES } from "../constants/defaultValues";
import hotelModel from "../models/hotelModel";
import { HotelQueryData } from "../types/hotelTypes";

export default {
  async gets(queryData: HotelQueryData) {
    const { filter }: HotelQueryData = queryData;

    const regex = new RegExp(filter?.trim(), "gi");

    const query = {
      ...(filter && {
        $or: [
          { hotel_name: regex },
          { country: regex },
          { city: regex },
          { chain_name: regex },
        ],
      }),
    };

    const hotels = await hotelModel.find(query).sort({ createdAt: -1 });

    return hotels;
  },

  async get(hotelId: string) {
    const redisKey = `${process.env.HOTEL_REDIS_KEY}-${hotelId}`;
    const redisExpiry = parseInt(`${process.env.REDIS_EXPIRY_TIME}`);
    const cachedHotel = await get(redisKey);
    if (cachedHotel) return cachedHotel;

    const hotel = await hotelModel.findById(hotelId);
    await set(redisKey, hotel, redisExpiry);

    if (!hotel) throw new Error(ERROR_MESSAGES.HOTEL_NOT_FOUND);
    return hotel;
  },
};
