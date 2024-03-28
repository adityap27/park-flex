// types.d.ts
import { IUser } from './models/Users'; 
declare global {
  namespace Express {
    interface Request {
      user?: IUser; 
    }
  }
}
