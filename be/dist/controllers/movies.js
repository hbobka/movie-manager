"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovie = exports.deleteMovie = exports.getMovie = exports.getAllMovies = exports.createMovie = void 0;
const movie_1 = require("../models/movie");
/**
 * Controller for creating a new movie
 */
const createMovie = async (req, res, next) => {
    const movie = new movie_1.MovieModel({
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
    }
    catch (error) {
        console.error("Movie could not be saved");
        console.error(error);
        res.status(500).json({ message: "Movie could not be saved" });
    }
};
exports.createMovie = createMovie;
/**
 * Controller for getting all movies
 */
const getAllMovies = async (req, res, next) => {
    try {
        const movies = await movie_1.MovieModel.find().sort({ $natural: -1 });
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
    }
    catch (error) {
        console.error("Movies could not be fetched");
        console.error(error);
        res.status(500).json({ message: "Movies could not be fetched" });
    }
};
exports.getAllMovies = getAllMovies;
/**
 * Controller for getting a single movie by id
 */
const getMovie = async (req, res, next) => {
    try {
        const foundMovie = await movie_1.MovieModel.findById({ _id: req.params.id });
        res.status(200).json({ movie: foundMovie });
        console.log("Movie fetched");
    }
    catch (error) {
        console.error("Movie could not be fetched");
        console.error(error);
        res.status(500).json({ message: "Movie could not be fetched" });
    }
};
exports.getMovie = getMovie;
/**
 * Controller for deleting a movie by id
 */
const deleteMovie = async (req, res, next) => {
    try {
        await movie_1.MovieModel.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Movie deleted" });
        console.log("Movie deleted");
    }
    catch (error) {
        console.error("Movie could not be deleted");
        console.error(error);
        res.status(500).json({ message: "Movie could not be deleted" });
    }
};
exports.deleteMovie = deleteMovie;
/**
 * Controller for updating a movie by id
 */
const updateMovie = async (req, res, next) => {
    try {
        await movie_1.MovieModel.findOneAndUpdate({ _id: req.params.id }, { ...req.body });
        res.status(200).json({ message: "Movie updated" });
        console.log("Movie updated");
    }
    catch (error) {
        console.error("Movie could not be updated");
        console.error(error);
        res.status(500).json({ message: "Movie could not be updated" });
    }
};
exports.updateMovie = updateMovie;
