/**
* Author: Mann Patel
* Defines the routes related to transaction operations.
*/
import express from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import { getTransactions } from "../controllers/transactionController";
;
const router = express.Router();

router.get("/get-transactions", authenticateToken, getTransactions);

export default router;
