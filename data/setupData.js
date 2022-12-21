"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const movies_compact_1_json_1 = __importDefault(require("./movies-compact-1.json"));
const setupData = async () => {
    try {
        for (const movie of movies_compact_1_json_1.default) {
            await fetch("http://localhost:3000/movies", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(movie),
            });
        }
    }
    catch (error) {
        console.log(`Data could not be stored: ${error}`);
    }
};
setupData();
