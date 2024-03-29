/* Author: Shubham Patel */

/*
This component is responsible for managing listings.
It lists all the listings of a particular user, and allows to create, update, delete, and viewS them.
*/

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { HiExternalLink } from "react-icons/hi";
import { toast } from "react-toastify";

const ManageListings = () => {
    // Retrieving user token and ID from local storage
    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('userId');

    const navigate = useNavigate();
    const [listings, setListings] = useState<Array<any>>();

    // Effect hook for fetching listings
    useEffect(() => {
        // Redirecting to login if token or userid is missing
        if (!token || !userid) {
            navigate('/login');
            toast.error('Unauthorized');
            return;
        }

        toast.promise(
            axios.post('manage-listings/get-all', { userId: userid }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }), {
            pending: "Loading listings",
            success: {
                render(data) {
                    setListings(data.data.data.data);
                    return "Listings fetched successfully";
                },
            },
            error: {
                // Handling unauthorized errors
                render(error: any) {
                    if (error.data.response.status === 403 || error.data.response.status === 401) {
                        navigate('/login');
                        return "Unauthorized"
                    };
                    return "Error loading listings"
                }
            },
        });
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="flex items-center justify-center flex-col md:flex-row">
                <h1 className="text-4xl font-bold text-center mb-8 mt-8 md:ml-5 md:text-left md:mr-auto">Manage Listings</h1>
                <button type="button" className="flex justify-center bg-buttonPrimary hover:bg-blue-700 text-white font-bold text-center mt-4 mr-5 md:mt-10 mb-10 px-2 py-2 rounded md:ml-auto" onClick={() => navigate('/create-listing')}>Create New Listing</button>
            </div>
            {listings && listings.length > 0 ?
                <ul className="px-5 divide-gray-200 divide-y mb-10">
                    {listings ? listings.map((listing, index) => (
                        <li key={index} className="py-2 justify-between flex items-center flex-wrap">
                            <div className="min-w-0 flex-col flex">
                                <div className="cursor-pointer flex items-center" onClick={() => { navigate('/view-listing', { state: { listingId: listing._id } }) }}>
                                    <p className="inline-flex leading-6 text-sm text-gray-900 font-semibold">{listing.name}<HiExternalLink className="ml-1" /></p>
                                </div>
                                <div className="flex items-center">
                                    <p className="leading-6 text-sm text-gray-900">{`${listing.streetAddress}, ${listing.city}, ${listing.country}`}</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="leading-6 text-sm text-gray-900">{listing.postalCode}</p>
                                </div>
                            </div>
                            <div className="flex gap-x-4">
                                <button className="bg-green-600 inline-block py-1 border-primary h-10 rounded-md text-white hover:bg-green-500 font-medium px-3" onClick={() => navigate('/edit-listing', { state: { listingId: listing._id } })}>Edit Listing</button>
                                <button className="bg-red-600 inline-block py-1 border-primary h-10 rounded-md text-white hover:bg-red-500 font-medium px-3" onClick={() => {
                                    Swal.fire({
                                        title: "Are you sure?",
                                        text: "You won't be able to revert this!",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "Yes, delete it!"
                                    }).then((result: any) => {
                                        if (result.isConfirmed) {
                                            axios.post("manage-listings/delete", {
                                                "listingId": listing._id,
                                                "userId": userid
                                            }, {
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': `Bearer ${token}`
                                                }
                                            }).then(response => {
                                                if (response.data.success) {
                                                    setListings(response.data.data);
                                                    Swal.fire({
                                                        title: "Deleted!",
                                                        text: "Listing has been deleted.",
                                                        icon: "success"
                                                    });
                                                }
                                            }).catch(error => {
                                                // Handling errors during deletion
                                                if (error.response.status === 403 || error.response.status === 401) {
                                                    navigate('/login');
                                                    toast.error('Unauthorized');
                                                } else {
                                                    Swal.fire({
                                                        title: "Failed!",
                                                        text: "Failed to delete listing.",
                                                        icon: "error"
                                                    });
                                                    console.log("Error deleting listing: ", error);
                                                }
                                            });
                                        }
                                    });
                                }}>Delete Listing</button>
                            </div>
                        </li>
                    )) : <></>}
                </ul>
                : <div className="flex justify-center items-center mt-10 mb-10">
                    <p className="text-xl md:text-2xl lg:text-3xl">No Listings Found {listings}</p>
                </div>}
        </>
    )
}

export default ManageListings;