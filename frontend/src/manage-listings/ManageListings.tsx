import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { HiExternalLink } from "react-icons/hi";

const ManageListings = () => {
    const navigate = useNavigate();
    const [listings, setListings] = useState<Array<any>>();

    useEffect(() => {
        axios.post('http://localhost:3001/api/manage-listings/get-all', { userId: '65fb948e17a0912641e6b9d4' }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.data.success) {
                setListings(response.data.data);
            }
        }).catch(error => {
            console.error('Error fetching listings: ', error);
        });
    }, [])

    return (
        <>
            <div className="flex items-center justify-center flex-col md:flex-row">
                <h1 className="text-4xl font-bold text-center mb-8 mt-8 md:ml-5 md:text-left md:mr-auto">Manage Listings</h1>
                <button type="button" className="flex justify-center bg-buttonPrimary hover:bg-blue-700 text-white font-bold text-center mt-4 mr-5 md:mt-10 mb-10 px-2 py-2 rounded md:ml-auto" onClick={() => navigate('/create-listing')}>Create New Listing</button>
            </div>
            <ul className="px-5 divide-gray-200 divide-y mb-10">
                {listings ? listings.map((listing, index) => (
                    <li key={index} className="py-2 justify-between flex items-center flex-wrap">
                        <div className="min-w-0 flex-col flex">
                            <div className="cursor-pointer flex items-center" onClick={() => { navigate('/view-listing', { state: { listingId: listing._id } }) }}>
                                <p className="inline-flex leading-6 text-sm text-gray-900 font-semibold">{listing.name}<HiExternalLink className="ml-1"/></p>
                            </div>
                            <div className="flex items-center">
                                <p className="leading-6 text-sm text-gray-900">{`${listing.streetAddress}, ${listing.city}, ${listing.country}`}</p>
                            </div>
                            <div className="flex items-center">
                                <p className="leading-6 text-sm text-gray-900">{listing.postalCode}</p>
                            </div>
                        </div>
                        <div className="flex gap-x-4">
                            <button className="bg-green-500 inline-block py-1 border-primary h-10 rounded-md text-white hover:bg-green-600 font-medium px-3" onClick={() => navigate('/edit-listing', { state: { listingId: listing._id } })}>Edit Listing</button>
                            <button className="bg-red-500 inline-block py-1 border-primary h-10 rounded-md text-white hover:bg-red-600 font-medium px-3" onClick={() => {
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
                                        axios.post(`http://localhost:3001/api/manage-listings/delete?listingId=${listing._id}&userId=65fb948e17a0912641e6b9d4`).then(response => {
                                            if (response.data.success) {
                                                setListings(response.data.data);
                                                Swal.fire({
                                                    title: "Deleted!",
                                                    text: "Listing has been deleted.",
                                                    icon: "success"
                                                });
                                            }
                                        }).catch(error => {
                                            console.log("Error deleting listing: ", error);
                                            Swal.fire({
                                                title: "Failed!",
                                                text: "Failed to delete listing.",
                                                icon: "error"
                                            });
                                        });
                                    }
                                });
                            }}>Delete Listing</button>
                        </div>
                    </li>
                )) : <></>}
            </ul>
        </>
    )
}


export default ManageListings;
