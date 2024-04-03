/* Author: Jay Rana */
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoginImage from '../assets/images/Login.jpg'; 

// Functional component for the forget password page
const ForgetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');

  const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address.');
      return; 
    }

    const loadingToast = toast.loading('Sending reset link...');

    // Attempt to send the forget password request
    try {
      await axios.post('auth/forget-password', { email });
      toast.dismiss(loadingToast);
      toast.success('If that email address is in our database, we will send a reset link to it shortly.');
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('An error occurred. Please try again later.');
    }
  };

   // Render forget password page
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="md:flex-1 flex justify-center items-center bg-blue-500">
        <img src={LoginImage} alt="ParkFlex" className="w-full h-full object-cover" />
      </div>
      <div className="md:flex-1 flex justify-center items-center">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
          <h2 className="text-center font-bold text-xl mb-4">Reset Password</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
              Send Reset Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
