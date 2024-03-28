// types.d.ts
import { IUser } from './models/Users'; // Update the path to the actual location of your IUser interface.

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Add other user properties you expect in your JWT token payload
    }
  }
}
