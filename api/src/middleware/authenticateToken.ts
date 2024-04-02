/* Author: Jay Rana */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Defines the structure for AuthRequest, extending Request to include user property.
export interface AuthRequest extends Request {
  user?: any; 
}

// Middleware to authenticate token from the Authorization header.
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) return res.sendStatus(401);

  // Verify token and set user in request on success
  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; 
    next();
  });
};
