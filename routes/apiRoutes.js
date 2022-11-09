import express from "express";
import { registeredProperties } from "../controllers/apiController.js";

const router = express.Router();

router.get("/properties", registeredProperties);

export default router;
