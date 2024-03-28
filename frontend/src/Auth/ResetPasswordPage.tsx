import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useParams(); 
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) {
      toast.error('Token is missing.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/api/auth/reset-password', {
        token,
        newPassword,
      });
      toast.success(response.data.message);
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
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
