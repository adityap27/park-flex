// controllers/walletController.ts

import {  Response } from "express";
import { Wallet } from "../models/Wallet";
import stripe from "stripe";
import Transaction from "../models/Transaction";
import { AuthRequest } from "../middleware/authenticateToken";
import { Users } from "../models/User";

const stripeSecretKey ="sk_test_51Oz4veIzvURxPk5bVYn3LDcCl1JD6hTlcYPUBqnd9TM9QLavGScbcwcdpmgLpEk2IsmKfFvbwW1deKSp8ODhFLND00Q3mlZYb5";
const stripeClient = new stripe(stripeSecretKey);

export const addMoney =  async (req: AuthRequest, res: Response) => {
    const userId = req.user._id;
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      return res.status(404).send({ message: 'Wallet not found.' });
    }
    const { amount } = req.body;
    console.log("Received request to add money:", amount);
    try {
      const paymentIntent = await stripeClient.paymentIntents.create({
        amount: parseFloat(amount) * 100,
        currency: "usd",
        payment_method_types: ["card"],
      });
      wallet.balance += parseFloat(amount);
      await wallet.save();
      const transaction = new Transaction({
        userId: userId,
        amount: parseFloat(amount),
        type: 'top-up', 
      });
      await transaction.save();
      res
        .status(200)
        .json({ success: true, message: "Money added successfully" , newBalance: wallet.balance});
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

export const withdrawMoney = async (req: AuthRequest, res: Response) => {
    const userId = req.user._id;
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      return res.status(404).send({ message: 'Wallet not found.' });
    }
    const { amount } = req.body;
    console.log("Received request to withdraw money:", amount);
    try {
      if (wallet.balance < parseFloat(amount)) {
        return res.status(400).json({ message: "Insufficient funds" });
      }
  
      wallet.balance -= parseFloat(amount);
      await wallet.save();
  
      const transaction = new Transaction({
        userId: userId,
        amount: parseFloat(amount),
        type: 'withdrawal', 
      });
      await transaction.save();
      res
        .status(200)
        .json({ success: true, message: "Withdrawal Successful, money will be refunded to original payment method in 1-2 business days." , newBalance: wallet.balance});
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

export const getBalance =  async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user._id;
      const user = await Users.findById(userId);
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }
  
      const wallet = await Wallet.findOne({ userId });
      if (!wallet) {
        return res.status(404).send({ message: "Wallet not found." });
      }
  
      res.status(200).json({ balance: wallet.balance });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Server error while fetching wallet balance." });
    }
  };