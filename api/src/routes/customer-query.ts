/**
 * Author: Ketul Patel
 *
 * This file declares all routes required for customer queries functionality
 */
import express from "express";
import { registerCustomerQuery } from "../controllers/customer-query";

const router = express.Router();

router.post("/register", registerCustomerQuery);

export default router;
