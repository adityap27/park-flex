// src/Auth/RegistrationPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "../stores/useAuthStore";
import axios from "axios";
import RegistrationImage from "../assets/images/Login.jpg";
const RegistrationPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  // Validation functions
  const isValidName = (name: string): boolean => /^[A-Za-z\s]+$/.test(name);
  const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Name validations
    if (!isValidName(firstName)) {
      toast.error("Please enter a valid first name with characters only.");
      return;
    }
    if (!isValidName(lastName)) {
      toast.error("Please enter a valid last name with characters only.");
      return;
    }

    // Email validation
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!isValidPassword(password)) {
      toast.error(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    // Password match validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // Attempt to register
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
      if (response.data.token) {
        setToken(response.data.token);
        axios.defaults.headers["Authorization"] =
          "Bearer " + response.data.token;
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during registration.");
    }
  };

  return (
    <div className='flex flex-col md:flex-row min-h-screen bg-gray-100'>
      <div className='md:flex-1 flex justify-center items-center bg-green-500'>
        <img
          src={RegistrationImage}
          alt='Welcome to ParkFlex'
          className='w-full h-full object-cover'
        />
      </div>
      <div className='md:flex-1 flex justify-center items-center'>
        <form
          onSubmit={handleRegister}
          className='space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg'
        >
          <h2 className='text-center font-bold text-xl mb-4'>
            Create Your Account
          </h2>
          <input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First Name'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last Name'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email Address'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
