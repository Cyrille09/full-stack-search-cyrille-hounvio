import { connect } from "mongoose";

export const connectDatabase = async () => {
  try {
    await connect(`${process.env.DATABASE_URL}`);
    console.log("Database connected");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Database connection failed:", error.message);
    } else {
      console.log("Database connection failed:", error);
    }
    process.exit(1);
  }
};
