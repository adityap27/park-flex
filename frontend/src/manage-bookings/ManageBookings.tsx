import React, { useEffect, useState } from 'react';
import PreviousBookings from './PreviousBookings';
import "./booking.css";
import { Link } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore'; 
import axios from 'axios';

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
};

const ManageBookings: React.FC = () => {
  const [currentBookings, setCurrentBookings] = useState<Booking[]>([]);
  const [previousBookings, setPreviousBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, userId } = useAuthStore(state => ({ user: state.user, userId: state.userId }));
  const token = useAuthStore(state => state.token);
  console.log(token)

  console.log(userId)
  const user_id = userId;    

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
          return { ...booking, listingName: listing.data.name };
        }));

        // Current date for comparison
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


  return (
    <>
      <div className="CurrentBooking">
        <h2 className='fs-2'>Current Booking</h2>
        {currentBookings.length > 0 ? currentBookings.map((booking) => (
          <div key={booking._id} className='mainCurrentDiv'>
            <div className="BookingDetails">
              <h3 className='fs-4'>{booking.listingName}</h3>
              <p>From: {new Date(booking.startDate).toLocaleDateString()} To: {new Date(booking.endDate).toLocaleDateString()}</p>
              <p className='mb-2'>Price: ${booking.bookingPrice}</p>
              <Link state={booking}  to='/confirmbooking'> <button className="btn btn-info mr-3 btn-sm mb-2">Edit</button></Link>
              <button className="btn-danger btn mr-3 btn-sm mb-2" onClick={() => deleteBooking(booking._id)}>Cancel Booking</button>
              <Link state={booking}  to='/viewdetails'> <button className="bg-buttonPrimary hover:bg-blue-700 text-white text-center btn btn-sm rounded mb-2 mr-2">View Details</button></Link>
            </div>
          </div>
        )) : <p>No current bookings available.</p>}
      </div>
      <PreviousBookings data={previousBookings} />
    </>
  );
};

export default ManageBookings;
