import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Movie = new Schema({
  name: String,
  year: Number,
  genres: [String],
  ageLimit: Number,
  rating: Number,
  actors: [{ firstName: String, lastName: String }],
  director: { firstName: String, lastName: String },
  synopsis: String,
});

export const MovieModel = mongoose.model("Movie", Movie);
