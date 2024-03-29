import React from 'react';

type Booking = {
  _id: string;
  listingId: string;
  listingName: string,
  seekerId: string;
  startDate: string; // These are now more specifically named than dateStart/dateEnd
  endDate: string;
  vehicleType: string;
  specialRequests: string;
  bookingPrice: number;
  createdAt: string;
  updatedAt: string;
};

interface PreviousBookingsProps {
  data: Booking[];
}

const PreviousBookings: React.FC<PreviousBookingsProps> = ({ data }) => {
  // Now you can map over data to display previous bookings
  return (
    <>
      <div className="PreviousBookingsHeader">
        <h2 className='fs-3'>Previous Bookings</h2>
      </div>
      <div className="PreviousBookings">
        {data.map((booking) => (
          <div key={booking._id} className="BookingCard Completed">
            <h3 className='fs-4'>{booking.listingName}</h3>
            <p>{new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</p>
            <p>{booking.bookingPrice}$</p>
            <button className="bg-buttonPrimary hover:bg-blue-700 text-white text-center btn btn-sm rounded mr-2">Book Again</button>
            <button className="bg-buttonPrimary hover:bg-blue-700 text-white text-center btn btn-sm rounded">View Details</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default PreviousBookings;
