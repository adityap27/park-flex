import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios
import useAuthStore from '../stores/useAuthStore';
import './ViewDetails.css';

type OwnerDetails = {
  email: string;
  firstName: string;
  lastName: string;
  _id: string;
};

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
  const location = useLocation();
  const booking = location.state;
  const [listingDetails, setListingDetails] = useState<ListingDetails | null>(null);
  const [ownerDetails, setOwnerDetails] = useState<OwnerDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, userId } = useAuthStore(state => ({ user: state.user, userId: state.userId }));
  const token = useAuthStore(state => state.token);

  useEffect(() => {
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


  return (
    <>
    <div className='px-20'>
<div className="mb-4">
  <h4 className='fs-3'>Booking Details</h4>
</div>
<div className="row g-3">
  <div className="d-flex align-items-center gap-3">
    
    <div className="d-grid gap-2">
    <h2>Owner Details</h2>
      <div className="fw-bold">{ownerDetails?.firstName} {ownerDetails?.lastName}</div>
      <div className="text-secondary">{ownerDetails?.email}</div>
    </div>
    
    <div className="d-grid gap-2">
    <h2>User Details</h2>
      <div className="fw-bold">{user.firstName} {user.lastName}</div>
      <div className="text-secondary">{user.email}</div>
    </div>
  </div>

  <div className="d-grid gap-2">
      <div className="fw-bold">Place</div>
      <div>{listingDetails?.name}</div>
    </div>
  <div className="d-grid gap-3">
    <div className="d-grid gap-2">
      <div className="fw-bold">Start date</div>
      <div>{booking?.startDate}</div>
    </div>
    <div className="d-grid gap-2">
      <div className="fw-bold">End date</div>
      <div>{booking?.endDate}</div>
    </div>
    <div className="d-grid gap-2">
      <div className="fw-bold">Price</div>
      <div>{booking?.bookingPrice}</div>
    </div>
  </div>
</div>
</div>
<div className="mt-4 px-20">
<div className="mb-4">
  <h4>Other Details</h4>
</div>
<div className="row g-3">
<div className="col-md-6">
{listingDetails?.image.data ? (
  <img
    alt="Parking image"
    className="img-fluid rounded-lg"
    src={`data:${listingDetails.image.contentType};base64,${listingDetails.image.data}`}
    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
  />
) : (
  <img
    alt="Parking image"
    className="img-fluid rounded-lg"
    src="/placeholder.svg"
  />
)}
</div>

  <div className="col-md-6 d-grid gap-3">
  <div className="d-grid gap-2">
      <div className="fw-bold">Parking Type</div>
      <div>{listingDetails?.parkingType}</div>
    </div>
   
    <div className="d-grid gap-2">
      <div className="fw-bold">Description</div>
      <div>{listingDetails?.description}</div>
    </div>

    <div className="d-grid gap-2">
      <div className="fw-bold">Vehicle Type</div>
      <div>{booking?.vehicleType}</div>
    </div>

    <div className="d-grid gap-2">
      <div className="fw-bold">Location</div>
      <div>{listingDetails?.city}, {listingDetails?.country}</div>
    </div>

    <div className="d-grid gap-2">
      <div className="fw-bold">Street Address</div>
      <div>{listingDetails?.streetAddress}</div>
    </div>
    
    <div className="d-grid gap-2">
      <div className="fw-bold">Postal Code</div>
      <div>{listingDetails?.postalCode}</div>
    </div>
   
  
    <div className="d-grid gap-2">
      <div className="fw-bold">Special Requests</div>
      <div>{booking?.specialRequests}</div>
    </div>
  </div>
</div>
</div>

  </>
  );
};

export default ViewDetails;
