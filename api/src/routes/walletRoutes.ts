/**
* Author: Mann Patel
* Defines the routes related to wallet operations.
*/
import express from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import { addMoneyToWallet, getBalance, withdrawMoneyFromWallet } from "../controllers/walletController";

const router = express.Router();

router.post("/add-money", authenticateToken, addMoneyToWallet);
router.post("/withdraw-money", authenticateToken, withdrawMoneyFromWallet);
router.get("/get-balance", authenticateToken, getBalance);


export default router;
