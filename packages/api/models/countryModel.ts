import { Schema, model } from "mongoose";
import { CreateCountryDTO } from "../types/countryTypes";

const CountrySchema = new Schema<CreateCountryDTO>(
  {
    country: { type: String, trim: true, required: true },
    countryisocode: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

// Indexes for faster search and sorting
CountrySchema.index({ country: 1 }); // Index for searching by country name
CountrySchema.index({ countryisocode: 1 }); // Index for filtering by country code
CountrySchema.index({ createdAt: -1 }); // Index for sorting by date (descending)

export default model("Country", CountrySchema);
