
import { Response } from "express";
import Transaction from "../models/Transaction";
import {  AuthRequest } from "../middleware/authenticateToken";

export const getTransactions = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user._id;
        const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });
    
        const formattedTransactions = transactions.map(transaction => ({
          ...transaction.toJSON(),
          date: transaction.createdAt.toISOString(),
        }));
    
        res.json(formattedTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Server error while fetching transactions." });
      }
};
