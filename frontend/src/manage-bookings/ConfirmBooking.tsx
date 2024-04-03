/**
 * Author : Neel Patel
 * This component is responsible for add/confirm bookings with all required information.
 * This component also allows user to edit booking after onces it done.
 */

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';
import { toast } from "react-toastify";
import axios from 'axios';

// Type definition for the booking object
type Booking = {
    listingId: string;
    seekerId: string;
    startDate: string; 
    endDate: string;
    vehicleType: string;
    specialRequests: string;
    bookingPrice: number;
   
  };
const ConfirmBooking: React.FC = () => {
    const { userId } = useAuthStore(state => ({ user: state.user, userId: state.userId }));

    // Hooks for navigation and accessing location state
    const navigate = useNavigate();
    const location = useLocation();
    const { parkingSpot, totalPrice, startDate, endDate } = location.state;
    const booking = location.state
    console.log(booking);

    // State for managing booking details form
    const [confirmBookingDetails, setConfirmBookingDetails] = useState<Booking>(() => {
        return {
        listingId: parkingSpot ? parkingSpot._id : booking.listingId,
        seekerId: userId || '',
        startDate: startDate ? startDate : booking.startDate,
        endDate: endDate ? endDate : booking.endDate,
        vehicleType: booking ? booking.vehicleType : "",
        specialRequests: booking ? booking.specialRequests : "",
        bookingPrice: totalPrice ? totalPrice : booking.bookingPrice
        };
    });
    console.log(totalPrice);
    console.log(confirmBookingDetails);
    const { token } = useAuthStore(state => ({ token: state.token }));
    console.log(token);

    // Handler for form field changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setConfirmBookingDetails(prevDetails => ({
          ...prevDetails,
          [e.target.name]: e.target.value,
        }));
      };

      // Handler for form submission
    const submitEvent = async (e: React.FormEvent) => {
        e.preventDefault();


        try {
      // API call to check user's wallet balance before proceeding with booking
          const balanceResponse = await axios.get("http://localhost:3001/api/wallet/get-balance", {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        const balance = balanceResponse.data.balance;

      // Check if balance is sufficient for booking
        if (balance < confirmBookingDetails.bookingPrice) {
          toast.error("Your balance is insufficient. Please top up your wallet.")
          navigate('/wallet', { state: { message: 'Your balance is insufficient. Please top up your wallet.' } });
            return;
        }

      // Findout the API URL and method based on whether booking is new or an edit
      // IF bookingId exists then update url else post url
        const url = booking._id
        ? `http://localhost:3001/api/manage-bookings/bookings/${booking._id}` 
        : 'http://localhost:3001/api/manage-bookings/add-booking';
        const method = booking._id ? 'PUT' : 'POST';

        console.log(confirmBookingDetails)
        try {
        const response = await fetch(url, {
            method: method,
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
            },
            body: JSON.stringify({
              listingId : confirmBookingDetails.listingId,
              seekerId: confirmBookingDetails.seekerId,
              startDate: confirmBookingDetails.startDate,
              endDate: confirmBookingDetails.endDate,
              vehicleType: confirmBookingDetails.vehicleType,
              specialRequests: confirmBookingDetails.specialRequests,
              bookingPrice: confirmBookingDetails.bookingPrice
              
            }), 
        });

        // Handle unsuccessful response
        if (!response.ok) {
            throw new Error('Failed to process booking');
        }

        // Show a success message
        toast.success('Booking successfully processed');
        navigate('/manage-bookings'); 
        } catch (error) {
        console.error('Error processing booking:', error);
        toast.error('Error processing booking');
        }
          
        } catch (error) {

          console.error('Error in getting balance:', error);
          toast.error('Error  in getting balance');
          
        }


    
    };

    // Render Confirm booking page
    return (
      <div className="container mx-auto mt-5 flex flex-col justify-center">
        <div className='w-100 flex justify-center'>  <h2 className=" text-2xl font-semibold mb-4">Confirm Your Booking</h2></div>
        <div className=''>
        <form onSubmit={submitEvent} className="w-full max-w-lg mx-auto bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="vehicleType" className="block text-gray-700 text-sm font-bold mb-2">Vehicle Type:</label>
            <input
                id="vehicleType"
                name="vehicleType"
                value={confirmBookingDetails.vehicleType}
                onChange={handleChange}
                type="text"
                placeholder="Enter vehicle type"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="specialRequests" className="block text-gray-700 text-sm font-bold mb-2">Special Requests:</label>
            <textarea
                id="specialRequests"
                name="specialRequests"
                value={confirmBookingDetails.specialRequests}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                placeholder="Any special requests?"
            />
          </div>
          <div className="flex items-center justify-between">
            <button 
                type="submit" 
                className="bg-buttonPrimary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Confirm Booking
            </button>
          </div>

        </form>
      </div>
      </div>
    );
};

export default ConfirmBooking;
