import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';
type Booking = {
    listingId: string;
    seekerId: string;
    startDate: string; 
    endDate: string;
    vehicleType: string;
    specialRequests: string;
    bookingPrice: number;
    createdAt: string;
    updatedAt: string;
  };
const ConfirmBooking: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const booking = location.state; 
    const [confirmBookingDetails, setConfirmBookingDetails] = useState<Booking>(() => {
        return {
        listingId: booking.listingId,
        seekerId: booking.seekerId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        vehicleType: "",
        specialRequests: "",
        bookingPrice: booking.bookingPrice,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
        };
    });
    const { token } = useAuthStore(state => ({ token: state.token }));
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setConfirmBookingDetails(prevDetails => ({
          ...prevDetails,
          [e.target.name]: e.target.value,
        }));
      };

    const submitEvent = async (e: React.FormEvent) => {
        e.preventDefault();

        const isUpdate = booking && booking._id;
        const url = isUpdate
        ? `http://localhost:3001/api/manage-booking/bookings/${booking._id}` 
        : 'http://localhost:3001/api/manage-booking/add-booking';
        const method = isUpdate ? 'PUT' : 'POST';
        try {
        const response = await fetch(url, {
            method: method,
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
            },
            body: JSON.stringify(booking), 
        });

        if (!response.ok) {
            throw new Error('Failed to process booking');
        }

        
        navigate('/manage-bookings'); 
        } catch (error) {
        console.error('Error processing booking:', error);
        
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
      <button type="submit">Confirm Booking</button>
    </form>
    );
    };

    export default ConfirmBooking;
