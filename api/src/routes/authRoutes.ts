import express from 'express';
import { register, login, forgetPassword, resetPassword, logout, getProfile, updateProfile } from '../controllers/authController';
import { authenticateToken } from '../middleware/authenticateToken';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forget-password', forgetPassword);
router.post('/reset-password', resetPassword); 
router.post('/logout', logout);
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);

export default router;
