import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
            <ul className="divide-y divide-gray-100 px-5">
                {listings ? listings.map((listing, index) => (
                    <li key={index} className="flex flex-wrap justify-between items-center py-2">
                        <div className="flex flex-col min-w-0 gap-y-1">
                            <div className="flex items-center gap-x-4 cursor-pointer" onClick={() => { navigate('/view-listing', { state: { listingId: listing._id } }) }}>
                                <p className="text-sm font-semibold leading-6 text-gray-900">{listing.name}</p>
                            </div>
                            <div className="flex items-center gap-x-4">
                                <p className="text-sm leading-6 text-gray-900">{`${listing.streetAddress}, ${listing.city}, ${listing.country}`}</p>
                            </div>
                            <div className="flex items-center gap-x-4">
                                <p className="text-sm leading-6 text-gray-900">{listing.postalCode}</p>
                            </div>
                        </div>
                        <div className="flex gap-x-4">
                            <button className="inline-block px-3 py-1 h-10 rounded-md border-primary text-white bg-green-500 hover:bg-green-600 font-medium" onClick={() => navigate('/edit-listing', { state: { listingId: listing._id } })}>Edit Listing</button>
                            <button className="inline-block px-3 py-1 h-10 rounded-md border-primary text-white bg-red-500 hover:bg-red-600 font-medium" onClick={() => {
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
