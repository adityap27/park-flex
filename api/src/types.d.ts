/* Author: Jay Rana */
import { IUser } from './models/Users'; 
// Extend Express Request interface to include a custom user property
declare global {
  namespace Express {
    interface Request {
      user?: IUser; 
    }
  }
}
