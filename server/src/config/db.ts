import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connection = mongoose.connect(process.env.mongoURL ?? "");

