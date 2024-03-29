import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


type BookingDetails = {
  listingName?: string; // Add more fields as per your actual data structure
  // other details...
};

const ViewDetails = () => {
  const location = useLocation();
  const booking = location.state;
  const [details, setDetails] = useState<BookingDetails>({});

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        // Ensure booking.listingId is defined before attempting to fetch
        if (!booking || !booking.listingId) {
          console.log('Booking or booking.listingId is undefined');
          return;
        }

        const response = await fetch("http://localhost:3001/api/manage-listings/get", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ listingId: booking.listingId })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setDetails(data); 
        console.log("hello")
        console.log(data.data)
        
      } catch (error) {
        console.error('Failed to fetch booking details:', error);
      }
    };

    fetchBookingDetails();
  }, [booking]);

  return (
    <div>
        Comming Soon.    ..................................
    </div>
  );
};

export default ViewDetails;
