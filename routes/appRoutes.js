import express from "express";
import verifyAuth from "../middlewares/verifyAuth.js";
import {
  categories,
  home,
  notFound,
  searcher,
} from "../controllers/appController.js";

const router = express.Router();

// Home
router.get("/", [verifyAuth], home);

// Categories
router.get("/categories/:id", [verifyAuth], categories);

// 404
router.get("/404", [verifyAuth], notFound);

// Searcher
router.post("/search", [verifyAuth], searcher);

export default router;
