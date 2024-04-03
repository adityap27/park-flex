import { Request, Response } from "express";
import { dataBase } from "../dao/connection";
import { CustomerQuery } from "../models/CustomerQuery";

/**
 * This function register a query/issue raised by customer
 * @param req
 * @param res
 */
export const registerCustomerQuery = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({
      message: "body cannot be  null",
    });
  }

  const query = new CustomerQuery({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    isComplete: false,
  });

  await query.save();

  res.status(200).json({
    message: "Successfully registered your query",
  });
};
