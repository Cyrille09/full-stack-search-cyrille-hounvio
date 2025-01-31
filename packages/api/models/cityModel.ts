import { Schema, model } from "mongoose";
import { CreateCityDTO } from "../types/cityTypes";

const CitySchema = new Schema<CreateCityDTO>(
  {
    name: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

// Indexes for faster search and sorting
CitySchema.index({ name: 1 }); // Index for searching by city name
CitySchema.index({ createdAt: -1 }); // Index for sorting by date (descending)

export default model("City", CitySchema);
