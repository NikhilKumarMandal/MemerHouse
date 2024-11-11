import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import logger from "../utils/logger";

export const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
  } catch (error) {
    logger.error("Somthing went while connecting DB", error);
    throw error instanceof Error ? error : new Error(String(error));
  }
};
