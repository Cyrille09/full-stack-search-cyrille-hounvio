import { Schema, model } from "mongoose";
import { CreateHotelDTO } from "../types/hotelTypes";

const HotelSchema = new Schema<CreateHotelDTO>(
  {
    chain_name: { type: String, trim: true },
    hotel_name: { type: String, trim: true, required: true },
    addressline1: { type: String, trim: true },
    addressline2: { type: String, trim: true },
    zipcode: { type: String, trim: true },
    city: { type: String, trim: true, required: true },
    state: { type: String, trim: true },
    country: { type: String, trim: true, required: true },
    countryisocode: { type: String, trim: true, required: true },
    star_rating: { type: Number, trim: true },
  },
  { timestamps: true }
);

// Indexes for faster search and sorting
HotelSchema.index({ hotel_name: 1 }); // Index for searching by hotel name
HotelSchema.index({ country: 1 }); // Index for filtering by country name
HotelSchema.index({ city: 1 }); // Index for searching by city name
HotelSchema.index({ chain_name: 1 }); // Index for searching by chain name
HotelSchema.index({ createdAt: -1 }); // Index for sorting by date (descending)

export default model("Hotel", HotelSchema);
