import { Response } from "express";
import countryModel from "../models/countryModel";
import cityModel from "../models/cityModel";
import hotelModel from "../models/hotelModel";
import { cities } from "../db/seeds/cities.js";
import { countries } from "./seeds/countries";
import { hotels } from "./seeds/hotels";
import { CreateCountryDTO } from "../types/countryTypes";
import { CreateCityDTO } from "../types/cityTypes";
import { CreateHotelDTO } from "../types/hotelTypes";

// Define an enum for model names
enum ModelName {
  Countries = "Countries",
  Cities = "Cities",
  Hotels = "Hotels",
}

// Define a generic interface for models
interface SeedModel<T> {
  insertMany: (data: T[]) => Promise<void>;
}

const seedModel = async <T>(
  model: SeedModel<T>,
  data: T[],
  modelName: ModelName
): Promise<void> => {
  try {
    if (!data || data.length === 0) {
      console.warn(`No data provided for ${modelName}. Skipping.`);
      return;
    }
    await model.insertMany(data);
    console.log(`${modelName} seeded successfully (${data.length} records).`);
  } catch (error) {
    console.error(`Error seeding ${modelName}:`, (error as Error).message);
  }
};

export const seedDatabase = async (): Promise<void> => {
  try {
    await seedModel<CreateCountryDTO>(
      countryModel as any,
      countries,
      ModelName.Countries
    );
    await seedModel<CreateCityDTO>(cityModel as any, cities, ModelName.Cities);
    await seedModel<CreateHotelDTO>(
      hotelModel as any,
      hotels,
      ModelName.Hotels
    );
  } catch (globalError) {
    console.error(
      "Critical error during database seeding:",
      (globalError as Error).message
    );
  }
};

export default {
  async insertData(req: any, res: Response): Promise<void> {
    req.logger.info("Starting database seeding...");
    try {
      await seedDatabase();
      req.logger.info("Data insertion process completed!");
      res.status(200).send("Data insertion process completed!");
    } catch (error) {
      req.logger.error("An error occurred while inserting data:", error);
      res.status(500).send("An error occurred while inserting data.");
    }
  },
};
