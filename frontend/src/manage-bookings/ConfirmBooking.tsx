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
    const navigate = useNavigate();
    const location = useLocation();
    const { parkingSpot, totalPrice, startDate, endDate } = location.state;
    const booking = location.state
    console.log(booking);
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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setConfirmBookingDetails(prevDetails => ({
          ...prevDetails,
          [e.target.name]: e.target.value,
        }));
      };

    const submitEvent = async (e: React.FormEvent) => {
        e.preventDefault();


        try {

          const balanceResponse = await axios.get("http://localhost:3001/api/wallet/get-balance", {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        const balance = balanceResponse.data.balance;

        if (balance < confirmBookingDetails.bookingPrice) {
          toast.error("Your balance is insufficient. Please top up your wallet.")
          navigate('/wallet', { state: { message: 'Your balance is insufficient. Please top up your wallet.' } });
            return;
        }

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

        if (!response.ok) {
            throw new Error('Failed to process booking');
        }

        
        navigate('/manage-bookings'); 
        } catch (error) {
        console.error('Error processing booking:', error);
        
        }
          
        } catch (error) {

          console.error('Error in getting balance:', error);
          
        }


    
    };

    return (
        <form onSubmit={submitEvent}>
      <div>
        <label htmlFor="vehicleType">Vehicle Type:</label>
        <input
          id="vehicleType"
          name="vehicleType"
          value={confirmBookingDetails.vehicleType}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="specialRequests">Special Requests:</label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          value={confirmBookingDetails.specialRequests}
          onChange={handleChange}
        />
      </div>
      {/* Include other fields as necessary */}
      <button onClick={submitEvent}>Confirm Booking</button>
    </form>
    );
    };

    export default ConfirmBooking;
