import express from "express";
import { getAllParkingSpot, getParkingSpotById } from "../controllers/parkings";

const router = express.Router();

router.get("/", getAllParkingSpot);

router.get("/:id", getParkingSpotById);

export default router;
