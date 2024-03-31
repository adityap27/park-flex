/* Author: Mann Patel */
import { Response } from "express";
import Transaction from "../models/Transaction";
import {  AuthRequest } from "../middleware/authenticateToken";

/**
 * Get all transactions for a specific user.
 * @param req The request object containing the user's authentication token.
 * @param res The response object to send the transactions data.
 */
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
