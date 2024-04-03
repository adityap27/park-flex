/**
 * Author : Neel Patel
 * This page shows all current and previous booking with options to edit, delete or view details.
 * This component is responsible for managing current bookings.
 */

import React, { useEffect, useState } from 'react';
import PreviousBookings from './PreviousBookings';
import "./booking.css";
import { Link } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore'; 
import axios from 'axios';

// Type definition for the booking object
type Booking = {
  _id: string;
  listingId: string;
  listingName: string; 
  seekerId: string;
  startDate: string; 
  endDate: string;
  vehicleType: string;
  specialRequests: string;
  bookingPrice: number;
  createdAt: string;
  updatedAt: string;
  image?: { contentType: string; data: string }
};

const ManageBookings: React.FC = () => {
  // State hooks to manage current and previous bookings data.
  const [currentBookings, setCurrentBookings] = useState<Booking[]>([]);
  const [previousBookings, setPreviousBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, userId } = useAuthStore(state => ({ user: state.user, userId: state.userId }));
  const token = useAuthStore(state => state.token);
  console.log(token)

  console.log(userId)
  const user_id = userId;    

  // Function to handle the deletion of a booking.
const deleteBooking = async (bookingId: string) => {
    try {
        const response = await axios.delete(`http://localhost:3001/api/manage-bookings/bookings/${bookingId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        setCurrentBookings(current => current.filter(booking => booking._id !== bookingId));
        setPreviousBookings(prev => prev.filter(booking => booking._id !== bookingId));
    } catch (error) {
        console.error('There was a problem with canceling the booking:', error);
    }
};


  useEffect(() => {
    const fetchCurrentBooking = async () => {
      setIsLoading(true);
      try {
        // Fetching bookings from the API.
        const response = await axios.get(`http://localhost:3001/api/manage-bookings/bookings/user/${user_id}`);
        
        let bookings: Booking[] = response.data;
        
        console.log(bookings)

        // Fetch listing names for each booking
        const listingsWithNames = await Promise.all(bookings.map(async (booking) => {
          const listingResponse = await axios.post("http://localhost:3001/api/manage-listings/get", 
            { listingId: booking.listingId },
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
          const listing = listingResponse.data;
          console.log(listing.data.image.contentType)
          return { ...booking, listingName: listing.data.name, image: {data: listing.data.image.data, contentType : listing.data.image.contentType }};
        }));

        const today = new Date();

        // Splitting bookings into current and previous based on the dates
        const current = listingsWithNames.filter(booking => {
          const endDate = new Date(booking.endDate);
          return endDate >= today;
        });

        const previous = listingsWithNames.filter(booking => {
          const endDate = new Date(booking.endDate);
          return endDate < today;
        });

        setCurrentBookings(current);
        setPreviousBookings(previous);
        console.log(currentBookings)
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentBooking();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

// Render view/manage booking page, shows current bookings
  return (
    <>
    <div className="container mx-auto pt-12 pb-10">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Current Bookings</h1>
    </div>
    {currentBookings.length > 0 ? currentBookings.map((booking) => (
        <div key={booking._id} className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl mb-10 hover:scale-105 hover:shadow-xl">
            <div className="md:flex">
                <div className="md:shrink-0">
                 
                    <img className="h-48 w-full object-cover md:h-full md:w-48"  src={booking.image?.data ? `data:${booking.image?.contentType};base64,${booking.image?.data}` : "https://via.placeholder.com/150"} alt="Booking" />
                </div>
                <div className="p-8">
                    <h3 className="text-lg font-semibold text-indigo-500">{booking.listingName}</h3>
                    <p className="mt-2">Dates: {new Date(booking.startDate).toLocaleDateString()} to {new Date(booking.endDate).toLocaleDateString()}</p>
                    <p className="mt-2">Price: <span className="font-bold">${booking.bookingPrice}</span></p>
                    <div className="mt-4 flex space-x-3">
                        <Link state={booking} to="/confirmbooking">
                            <button className="btn btn-info btn-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                        </Link>
                        <button onClick={() => deleteBooking(booking._id)} className="btn btn-danger btn-sm hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                        <Link state={booking} to="/viewdetails">
                            <button className="bg-buttonPrimary  btn-sm  hover:bg-green-700 text-white font-bold py-2 px-4 rounded">View Details</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )) : <p className="text-center">No current bookings available.</p>}
    <PreviousBookings data={previousBookings} />
    </>
  );
};

export default ManageBookings;
