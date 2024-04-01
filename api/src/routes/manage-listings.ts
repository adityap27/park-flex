/* Author: Shubham Patel */
import express from "express"
import { authenticateToken } from "../middleware/authenticateToken";
import { createListing, deleteListing, editListing, getAllListings, getListing } from "../controllers/manage-listings";
const router = express.Router();

router.post('/create', authenticateToken, createListing);

router.put('/edit', authenticateToken, editListing);

router.post('/get-all', authenticateToken, getAllListings);

router.post('/get', authenticateToken, getListing);

router.post('/delete', authenticateToken, deleteListing);

export default router;