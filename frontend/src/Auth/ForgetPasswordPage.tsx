import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/auth/forget-password', { email });
      toast.success('If that email address is in our database, we will send a reset link to it shortly.');
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgetPasswordPage;
