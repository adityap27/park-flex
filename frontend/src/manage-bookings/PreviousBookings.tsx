/**
 * Author : Neel Patel
 * This page shows all previous bookings with options to edit, delete or view details.
 * This component is responsible for viewing previous bookings.
 */


import React from 'react';
import { Link } from 'react-router-dom';

// Type definition for the booking object
type Booking = {
  _id: string;
  listingId: string;
  listingName: string,
  seekerId: string;
  startDate: string;
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

  // Render view/manage booking page, shows previous bookings
  return (
    <>
      <div className="bg-gray-100 p-4">
        <div className="container mx-auto pt-12 pb-10">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Previous Bookings
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-5">
          {data.map((booking) => (
            <div key={booking._id} className="bg-white rounded-lg shadow-lg p-8 hover:scale-105 hover:shadow-xl">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{booking.listingName}</h2>
              <div className="mb-4">
                <p className="text-gray-600">{new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600">Cost: <span className="text-gray-400">$</span>{booking.bookingPrice}</p>
              </div>
              <div className="text-right">
                <Link state={booking} to="/viewdetails">
                  <button className="bg-buttonPrimary inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PreviousBookings;
