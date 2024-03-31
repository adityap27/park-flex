import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser, Users } from '../models/User';
import crypto from 'crypto';
import { sendEmail } from '../utils/mailer';
import { AuthRequest } from '../middleware/authenticateToken';
import { Wallet } from '../models/Wallet';
export const register = async (req: Request, res: Response) => {
    try {
        // Check if the user already exists
        let user = await Users.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send({ message: 'Email is already in use.' });
        }
    
        user = new Users(req.body);
        await user.save();
        await Wallet.create({ userId: user._id, balance: 0 });
    
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, {
          expiresIn: '24h',
        });
        
        res.status(201).send({ user: user._id, token });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ message: error.message });
        } else {
            res.status(500).send({ message: 'An unexpected error occurred' });
        }
    }
};

export const login = async (req: Request, res: Response) => {
  try {
      const user = await Users.findOne({ email: req.body.email });
      if (!user) {
          return res.status(400).send({ message: 'Invalid email or password.' });
      }
  
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
          return res.status(400).send({ message: 'Invalid email or password.' });
      }
  
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, {
        expiresIn: '24h',
      });
      
      
      const userToSend = {
        _id: user._id,
      };

      // Send the token and the user data
      res.header('Authorization', token).send({ token, user: userToSend });
  } catch (error) {
      if (error instanceof Error) {
          res.status(500).send({ message: error.message });
      } else {
          res.status(500).send({ message: 'An unexpected error occurred' });
      }
  }
};


export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({ message: 'If that email address is in our database, we will send a reset link to it shortly.' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.resetToken = resetTokenHash;
    user.resetTokenExpiry = Date.now() + 3600000; // Token expires in one hour
    await user.save();

    const resetUrl = `http://localhost:3000/#/resetpassword/${resetToken}`;
    console.log("resetUrl"+resetUrl);
    await sendEmail(
      user.email,
      'Password Reset Request',
      `You are receiving this email because you (or someone else) has requested the reset of the password for your account.\n\n` +
      `Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n` +
      `${resetUrl}\n\n` +
      `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    );

    res.status(200).send({ message: 'If that email address is in our database, we will send a reset link to it shortly.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error during the password reset process.' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await Users.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: Date.now() }, 
    });

    if (!user) {
      return res.status(400).send({ message: 'Token is invalid or has expired.' });
    }

    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    await sendEmail(
      user.email,
      'Password Reset Confirmation',
      'Your password has been changed successfully.'
    );

    res.status(200).send({ message: 'Your password has been reset successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error during the password reset process.' });
  }
};


export const logout = async (req: Request, res: Response) => {
  res.status(200).send({ message: 'Logged out successfully' });
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(400).send({ message: 'User data not found in request.' });
    }
    
    const userId = req.user._id;

    const user = await Users.findById(userId).select('-password -resetToken -resetTokenExpiry'); 

    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    res.send({ profile: user.toObject() }); 
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error while fetching profile.' });
  }
};
export const getUserByID = async (req: AuthRequest, res: Response) => {
  try {
      
      const { id } = req.params;
      const user = await Users.findById(id);
      if (!user) {
          return res.status(404).send({ message: 'User not found.' });
      }
      res.status(200).send({user});
  } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Server error while fetching user by ID.' });
  }
};


export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(400).send({ message: 'Authentication required.' });
    }

    const userId = req.user._id;

    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    const allowedUpdates: (keyof IUser)[] = ['firstName', 'lastName', 'email', 'password'];

    const updates = Object.keys(req.body) as (keyof IUser)[];
    for (const field of updates) {
      if (!allowedUpdates.includes(field)) continue;

      if (field === 'password') {
        
        //const salt = await bcrypt.genSalt(10);
        //user.password = await bcrypt.hash(req.body[field], salt);
        user.password = req.body[field];
      } else {
        // @ts-ignore: Ignore the error about indexing with a string
        user[field] = req.body[field];
      }
    }

    await user.save();

    const updatedProfile = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    res.status(200).send({
      message: 'Profile updated successfully',
      profile: updatedProfile,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).send({ message: error.message });
    } else {
      console.error(error);
      res.status(500).send({ message: 'An unexpected error occurred.' });
    }
  }
};

