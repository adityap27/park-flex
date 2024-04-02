/**
 * Author: Ketul Patel
 *
 * This file declares all routes required for parking spot listing and finding particular parking spot with additional details
 */
import express from "express";
import { getAllParkingSpot, getParkingSpotById } from "../controllers/parkings";

const router = express.Router();

router.get("/", getAllParkingSpot);
router.get("/:id", getParkingSpotById);

export default router;
