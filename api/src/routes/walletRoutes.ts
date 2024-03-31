import express from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import { addMoney, getBalance, withdrawMoney } from "../controllers/walletController";

const router = express.Router();

router.post("/add-money", authenticateToken, addMoney);
router.post("/withdraw-money", authenticateToken, withdrawMoney);
router.get("/balance", authenticateToken, getBalance);


export default router;
