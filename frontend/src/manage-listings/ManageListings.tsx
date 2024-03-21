import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

// const listings = [
//     {
//         name: 'My Parking Lot 1',
//         streetAddress: '1600 Lower Water Street',
//         city: 'Halifax',
//         country: 'Canada',
//         postalCode: 'B3H 1B9'
//     },
//     {
//         name: 'My Parking Lot 2',
//         streetAddress: '1600 Lower Water Street',
//         city: 'Halifax',
//         country: 'Canada',
//         postalCode: 'B3H 1B9'
//     },
//     {
//         name: 'My Parking Lot 3',
//         streetAddress: '1600 Lower Water Street',
//         city: 'Halifax',
//         country: 'Canada',
//         postalCode: 'B3H 1B9'
//     },
//     {
//         name: 'My Parking Lot 4',
//         streetAddress: '1600 Lower Water Street',
//         city: 'Halifax',
//         country: 'Canada',
//         postalCode: 'B3H 1B9'
//     },
//     {
//         name: 'My Parking Lot 5',
//         streetAddress: '1600 Lower Water Street',
//         city: 'Halifax',
//         country: 'Canada',
//         postalCode: 'B3H 1B9'
//     },
//     {
//         name: 'My Parking Lot 6',
//         streetAddress: '1600 Lower Water Street',
//         city: 'Halifax',
//         country: 'Canada',
//         postalCode: 'B3H 1B9'
//     },
//     {
//         name: 'My Parking Lot 7',
//         streetAddress: '1600 Lower Water Street',
//         city: 'Halifax',
//         country: 'Canada',
//         postalCode: 'B3H 1B9'
//     },
//     {
//         name: 'My Parking Lot 8',
//         streetAddress: '1600 Lower Water Street',
//         city: 'Halifax',
//         country: 'Canada',
//         postalCode: 'B3H 1B9'
//     },
//     {
//         name: 'My Parking Lot 9',
//         streetAddress: '1600 Lower Water Street',
//         city: 'Halifax',
//         country: 'Canada',
//         postalCode: 'B3H 1B9'
//     },
//     {
//         name: 'My Parking Lot 10',
//         streetAddress: '1600 Lower Water Street',
//         city: 'Halifax',
//         country: 'Canada',
//         postalCode: 'B3H 1B9'
//     },
// ]

let listings: Array<any> = [];

const ManageListings = () => {
    const navigate = useNavigate();

    useEffect(() => {
        axios.post('http://localhost:3001/api/manage-listings/get-all', {userId: '65fb948e17a0912641e6b9d4'}, {
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => {
			if (response.data.success){
				console.log('Listing fetched successfully: ', response.data);
                listings = response.data.data
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
                {listings.map((listing, index) => (
                    <li key={index} className="flex justify-between gap-x-2 py-2">
                        <div className="flex min-w-0 gap-x-4 cursor-pointer" onClick={() => {navigate('/view-listing')}}>
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{listing.name}</p>
                            </div>
                        </div>
                        <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm leading-6 text-gray-900">{`${listing.streetAddress}, ${listing.city}, ${listing.country}`}</p>
                            </div>
                        </div>
                        <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm leading-6 text-gray-900">{listing.postalCode}</p>
                            </div>
                        </div>
                        <div className="flex min-w-0 gap-x-4">
                            <div className="flex">
                                <button className="inline-block px-3 py-1 rounded-md border-primary text-white bg-green-500 hover:bg-green-600 font-medium mx-2" onClick={() => navigate('/edit-listing')}>Edit Listing</button>
                                <button className="inline-block px-3 py-1 rounded-md border-primary text-white bg-red-500 hover:bg-red-600 font-medium" onClick={() => {
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
                                            Swal.fire({
                                                title: "Deleted!",
                                                text: "Your listing has been deleted.",
                                                icon: "success"
                                            });
                                            console.log("hello");
                                        }
                                    });
                                }}>Delete Listing</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}


export default ManageListings;
