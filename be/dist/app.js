"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const movies_1 = __importDefault(require("./routes/movies"));
const app = (0, express_1.default)();
// enable parsing json bodys
app.use((0, body_parser_1.json)());
// enable CORS
app.use((0, cors_1.default)());
// add movie routes
app.use("/movies", movies_1.default);
// handle errors globally
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
// connect to mongodb and listen on port 3000
const connectToDB = async () => {
    try {
        await mongoose_1.default.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@movie-manager-mongo-con:27017/movies?authSource=admin`);
        console.log("Connected to MongoDB:");
        app.listen(3000);
    }
    catch (error) {
        console.error("Could not connect to MongoDB:");
        console.error(error);
    }
};
connectToDB();
