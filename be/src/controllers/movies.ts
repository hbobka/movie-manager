import { RequestHandler } from "express";
import { MovieModel } from "../models/movie";

/**
 * Controller for creating a new movie
 */
export const createMovie: RequestHandler = async (req, res, next) => {
  const movie = new MovieModel({
    name: req.body.name || "",
    year: req.body.year || null,
    genres: req.body.genres || [],
    ageLimit: req.body.ageLimit || null,
    rating: req.body.rating || null,
    actors: req.body.actors || [],
    director: req.body.director || "",
    synopsis: req.body.synopsis || "",
  });

  try {
    await movie.save();
    res.status(201).json({
      message: "Movie saved",
      movie: { id: movie._id, title: movie.name },
    });
    console.log("Movie saved");
  } catch (error) {
    console.error("Movie could not be saved");
    console.error(error);
    res.status(500).json({ message: "Movie could not be saved" });
  }
};

/**
 * Controller for getting all movies
 */
export const getAllMovies: RequestHandler = async (req, res, next) => {
  try {
    const movies = await MovieModel.find().sort({ $natural: -1 });

    res.status(200).json({
      movies: movies.map((movie) => ({
        id: movie._id,
        name: movie.name,
        year: movie.year,
        genres: movie.genres,
        ageLimit: movie.ageLimit,
        rating: movie.rating,
        actors: movie.actors,
        director: movie.director,
        synopsis: movie.synopsis,
      })),
    });
    console.log("Movies fetched");
  } catch (error) {
    console.error("Movies could not be fetched");
    console.error(error);
    res.status(500).json({ message: "Movies could not be fetched" });
  }
};

/**
 * Controller for getting a single movie by id
 */
export const getMovie: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const foundMovie = await MovieModel.findById({ _id: req.params.id });

    res.status(200).json({ movie: foundMovie });
    console.log("Movie fetched");
  } catch (error) {
    console.error("Movie could not be fetched");
    console.error(error);
    res.status(500).json({ message: "Movie could not be fetched" });
  }
};

/**
 * Controller for deleting a movie by id
 */
export const deleteMovie: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    await MovieModel.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "Movie deleted" });
    console.log("Movie deleted");
  } catch (error) {
    console.error("Movie could not be deleted");
    console.error(error);
    res.status(500).json({ message: "Movie could not be deleted" });
  }
};

/**
 * Controller for updating a movie by id
 */
export const updateMovie: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    await MovieModel.findOneAndUpdate({ _id: req.params.id }, { ...req.body });

    res.status(200).json({ message: "Movie updated" });
    console.log("Movie updated");
  } catch (error) {
    console.error("Movie could not be updated");
    console.error(error);
    res.status(500).json({ message: "Movie could not be updated" });
  }
};
