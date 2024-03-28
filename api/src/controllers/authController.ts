import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser, Users } from '../models/User';
import crypto from 'crypto';
import { sendEmail } from '../utils/mailer';
import { AuthRequest } from '../middleware/authenticateToken';

export const register = async (req: Request, res: Response) => {
    try {
        // Check if the user already exists
        let user = await Users.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send({ message: 'Email is already in use.' });
        }
    
        // Create a new user with the request data
        user = new Users(req.body);
    
        // Save the new user
        await user.save();
    
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, {
          expiresIn: '24h',
        });
        
    
        // Return the new user and the token
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
        // Find user by email
        const user = await Users.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send({ message: 'Invalid email or password.' });
        }
    
        // Check if the password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).send({ message: 'Invalid email or password.' });
        }
    
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, {
          expiresIn: '24h',
        });
        
        // Return the token
        res.header('Authorization', token).send({ token });
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
    // Check if the user exists
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      // Respond as if the email has been sent to prevent email enumeration
      return res.status(200).send({ message: 'If that email address is in our database, we will send a reset link to it shortly.' });
    }

    // Generate a random reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    // Hash the reset token before saving it to the database
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set token and expiry date on user model (add these fields to your user schema if not already present)
    user.resetToken = resetTokenHash;
    user.resetTokenExpiry = Date.now() + 3600000; // Token expires in one hour
    await user.save();

    // Create reset URL (you'll need to replace <frontend-domain> with your actual frontend domain)
    const resetUrl = `http://localhost:3000/#/resetpassword/${resetToken}`;
    console.log("resetUrl"+resetUrl);
    // Send the email
    await sendEmail(
      user.email,
      'Password Reset Request',
      `You are receiving this email because you (or someone else) has requested the reset of the password for your account.\n\n` +
      `Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n` +
      `${resetUrl}\n\n` +
      `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    );

    // Respond to the user
    res.status(200).send({ message: 'If that email address is in our database, we will send a reset link to it shortly.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error during the password reset process.' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    // Find the user by the resetToken after hashing it
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await Users.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: Date.now() }, // Check if the token has not expired
    });

    if (!user) {
      return res.status(400).send({ message: 'Token is invalid or has expired.' });
    }

    // Set the new password and clear the resetToken fields
    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    // Pre-save hook will hash the password before saving
    await user.save();

    // Send a confirmation email to the user
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
    
    // The user ID is extracted from the token payload by the authenticateToken middleware
    const userId = req.user._id;

    const user = await Users.findById(userId).select('-password -resetToken -resetTokenExpiry'); // Exclude sensitive fields

    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    res.send({ profile: user.toObject() }); // use toObject() if you need to manipulate the returned document
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error while fetching profile.' });
  }
};


export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(400).send({ message: 'Authentication required.' });
    }

    // Extract the user ID from the token payload
    const userId = req.user._id;

    // Fetch the user from the database
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    // Define the fields that can be updated
    const allowedUpdates: (keyof IUser)[] = ['firstName', 'lastName', 'email', 'password'];

    // Update user's profile with the new data provided in the request body
    const updates = Object.keys(req.body) as (keyof IUser)[];
    for (const field of updates) {
      if (!allowedUpdates.includes(field)) continue;

      if (field === 'password') {
        // Hash the new password before saving
        //const salt = await bcrypt.genSalt(10);
        //user.password = await bcrypt.hash(req.body[field], salt);
        user.password = req.body[field];
      } else {
        // @ts-ignore: Ignore the error about indexing with a string, we've already checked that field is a valid key
        user[field] = req.body[field];
      }
    }

    // Save the updated user document
    await user.save();

    // Prepare the updated profile data, excluding sensitive information
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

