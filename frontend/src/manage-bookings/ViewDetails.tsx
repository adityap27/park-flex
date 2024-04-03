/**
 * Author : Neel Patel
 * This page shows booking information detail like owner, user, listing, booking, parking spot and charges information.
 */

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios
import useAuthStore from '../stores/useAuthStore';
import './ViewDetails.css';


// Type definition for the user object
type OwnerDetails = {
  email: string;
  firstName: string;
  lastName: string;
  _id: string;
};


// Type definition for the listing object
type ListingDetails = {
  _id: string;
  name: string;
  city: string;
  country: string;
  createdAt: string;
  dailyRate: number;
  description: string;
  image: {
    data: string;
    contentType: string;
  };
  location: {
    coordinates: number[];
    type: string;
  };
  owner: string;
  parkingType: string;
  postalCode: string;
  streetAddress: string;
  updatedAt: string;
  __v: number;
};

const ViewDetails = () => {

  // Hook to access the current location and state passed via routing.
  const location = useLocation();
  const booking = location.state;
  const [listingDetails, setListingDetails] = useState<ListingDetails | null>(null);
  const [ownerDetails, setOwnerDetails] = useState<OwnerDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Extracting user and token from the authentication store.
  const { user, userId } = useAuthStore(state => ({ user: state.user, userId: state.userId }));
  const token = useAuthStore(state => state.token);

  useEffect(() => {

    // Function to fetch booking, listing, and owner information.
    const fetchBookingDetails = async () => {
      setIsLoading(true);
      try {
        if (!booking || !booking.listingId) {
          console.log('Booking or booking.listingId is undefined');
          setIsLoading(false);
          return;
        }

        // Using axios for fetching listing details
        const response = await axios.post("http://localhost:3001/api/manage-listings/get", { listingId: booking.listingId }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setListingDetails(response.data.data);

        const ownerId = response.data.data.owner;

        // Using axios for fetching owner details
        const ownerResponse = await axios.get(`http://localhost:3001/api/auth/getuser/${ownerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOwnerDetails(ownerResponse.data.user);

      } catch (error) {
        console.error('Failed to fetch booking details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingDetails();
  }, [token, booking]);

  if (isLoading) {
    return <div className="loading-indicator">Loading...</div>;
  }

// Render View details page.
  return (
    <>
    <div className="max-w-screen-xl mx-auto py-8 px-4 lg:py-16 lg:px-6">
    <div className="text-left mb-10">
        <h2 className="text-4xl tracking-tight font-bold text-primary-800">Booking Details Overview</h2>
    </div>

    <div className="flex flex-col md:flex-row">

        <div className="mr-0 md:mr-8 mb-6 md:mb-0 border-4 hover:scale-105">
        {listingDetails?.image.data ? (
          <img
            alt="Parking Spot"
            className="w-1/2 md:w-full mx-auto"
            style={{ width: '100%', maxWidth: '500px' }}
            src={`data:${listingDetails.image.contentType};base64,${listingDetails.image.data}`}
          />
        ) : (
          <img
            alt="Placeholder"
            className="rounded-lg object-cover h-64"
            style={{ width: '100%', maxWidth: '500px' }}
            src="/placeholder.svg"
          />
        )}
          
        </div>
       

        <div className="flex-1 flex flex-col sm:flex-row flex-wrap -mb-4 -mx-2">
            <div className="w-full sm:w-1/2 mb-4 px-2 ">
                <div className="h-full py-4 px-6 border border-green-500 border-t-0 border-l-0 rounded-br-xl">
                    <h3 className="text-2xl font-bold text-md mb-6">Booking Details:</h3>
                    <p className="text-sm">Start Date: {booking?.startDate}</p>
      <p className="text-sm ">End Date: {booking?.endDate}</p>
      <p className="text-sm ">Total Price: ${booking?.bookingPrice}</p>
                </div>
            </div>
            <div className="w-full sm:w-1/2 mb-4 px-2 ">
                <div className="h-full py-4 px-6 border border-green-500 border-t-0 border-l-0 rounded-br-xl">
                    <h3 className="text-2xl font-bold text-md mb-6">Owner Details</h3>
                    <p className="text-sm">Name: {ownerDetails?.firstName} {ownerDetails?.lastName}</p>
                    <p className="text-sm">Email: {ownerDetails?.email}</p>
                </div>
            </div>

            <div className="w-full sm:w-1/2 mb-4 px-2 ">
                <div className="h-full py-4 px-6 border border-green-500 border-t-0 border-l-0 rounded-br-xl">
                    <h3 className="text-2xl font-bold text-md mb-6">Parking Spot</h3>
                    <p className="text-sm">Type: {listingDetails?.parkingType}</p>
                    <p className="text-sm">Location: {listingDetails?.city}, {listingDetails?.country}</p>
                    <p className="text-sm">Allowed Vehicle Type: {booking?.vehicleType}</p>
                </div>
            </div>

            <div className="w-full sm:w-1/2 mb-4 px-2 ">
                <div className="h-full py-4 px-6 border border-green-500 border-t-0 border-l-0 rounded-br-xl">
                    <h3 className="text-2xl font-bold text-md mb-6">Other Deatils</h3>
                    <p className="text-sm">Description: {listingDetails?.description}</p>
                    <p className="text-sm">Street Address: {listingDetails?.streetAddress}</p>
                    <p className="text-sm">Postal Code: {listingDetails?.postalCode}</p>
                    <p className="text-sm">Special Requests: {booking?.specialRequests}</p>
                  </div>
            </div>


        </div>
    </div>
</div>
  </>
  );
};

export default ViewDetails;
