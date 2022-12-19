import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import movieRoutes from "./routes/movies";

const app = express();

// enable parsing json bodys
app.use(json());

// enable CORS
app.use(cors());

// add movie routes
app.use("/movies", movieRoutes);

// handle errors globally
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

// connect to mongodb and listen on port 3000
const connectToDB = async (): Promise<void> => {
  try {
    await mongoose.connect(
      `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@movie-manager-mongo-con:27017/movies?authSource=admin`
    );
    console.log("Connected to MongoDB:");
    app.listen(3000);
  } catch (error) {
    console.error("Could not connect to MongoDB:");
    console.error(error);
  }
};

connectToDB();
