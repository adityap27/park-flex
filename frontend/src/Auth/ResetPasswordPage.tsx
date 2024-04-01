import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoginImage from '../assets/images/Login.jpg'; // Ensure this path is correct

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>(); // Ensure your routing parameters are correctly captured
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Password validation function
  const isValidPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) {
      toast.error('Token is missing.');
      return;
    }

    // Check if the new password is valid
    if (!isValidPassword(newPassword)) {
      toast.error('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.');
      return; // Stop form submission if the new password is invalid
    }

    // Check if passwords match
    if (newPassword !== confirmNewPassword) {
      toast.error('Passwords do not match.');
      return; // Prevent form submission if passwords don't match
    }

    try {
      await axios.post('http://localhost:3001/api/auth/reset-password', {
        token,
        newPassword,
      });
      toast.success('Your password has been reset successfully.');
      navigate('/login');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Unable to reset password. Please try again later.');
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="md:flex-1 flex justify-center items-center bg-blue-500">
        <img src={LoginImage} alt="Reset Password" className="w-full h-full object-cover" />
      </div>
      <div className="md:flex-1 flex justify-center items-center">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
          <h2 className="text-center font-bold text-xl mb-4">Reset Your Password</h2>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirm New Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
