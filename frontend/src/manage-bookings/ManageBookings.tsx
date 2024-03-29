import React, { useEffect, useState } from 'react';
import PreviousBookings from './PreviousBookings';
import "./booking.css";
import { Link } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore'; 

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

  console.log(userId)
  const user_id = userId;

  const deleteBooking = async (bookingId: string) => {
    try {
      // Replace this URL with the actual endpoint you use for deleting bookings
      const response = await fetch(`http://localhost:3001/api/manage-bookings/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        // Include authentication tokens if your API requires them
      });
  
      if (!response.ok) {
        throw new Error('Failed to cancel the booking');
      }
  
      // Assuming the DELETE operation was successful, update the state to remove the canceled booking
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
        const response = await fetch(`http://localhost:3001/api/manage-bookings/bookings/user/${user_id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let bookings: Booking[] = await response.json();
        
  console.log(bookings)

        // Fetch listing names for each booking
        const listingsWithNames = await Promise.all(bookings.map(async (booking) => {
          const listingResponse = await fetch("http://localhost:3001/api/manage-listings/get", {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ listingId: booking.listingId })
          });
          if (!listingResponse.ok) {
            throw new Error('Listing fetch was not ok');
          }
          const listing = await listingResponse.json();
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
              <button className="btn btn-info mr-3 btn-sm mb-2">Edit</button>
              <button className="btn-danger btn mr-3 btn-sm mb-2" onClick={() => deleteBooking(booking._id)}>Cancel Booking</button>
              <Link state={booking}  to='/viewdetails'> <button className="bg-buttonPrimary hover:bg-blue-700 text-white text-center btn btn-sm rounded">View Details</button></Link>
             
            </div>
          </div>
        )) : <p>No current bookings available.</p>}
      </div>
      <PreviousBookings data={previousBookings} />
    </>
  );
};

export default ManageBookings;
