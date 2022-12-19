"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
exports.MovieModel = mongoose_1.default.model("Movie", Movie);
