import { Router } from "express";
import {
  createMovie,
  deleteMovie,
  getAllMovies,
  getMovie,
  updateMovie
} from "../controllers/movies";

const router = Router();
router.post("/", createMovie);
router.get("/:id", getMovie);
router.get("/", getAllMovies);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;
