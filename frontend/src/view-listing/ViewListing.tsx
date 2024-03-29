/* Author: Shubham Patel */

// This component is responsible for fetching particular listing details.

import { Icon, Map } from "leaflet";
import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import ParkingLotImg from "../assets/images/parking-spot.jpg";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import axios from "axios";
import "./style.css";
import { toast } from "react-toastify";

const ViewListing = () => {
    // Retrieving user token and ID from local storage
    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('userId');

    const navigate = useNavigate();
    const [listing, setListing] = useState<any>();
    const [imageString, setImageString] = useState<string>(ParkingLotImg);
    const [contentType, setContentType] = useState<string>("data:image/jpeg;base64,");
    const { state } = useLocation();

    // LatLng class definition for location coordinates
    class LatLng {
        lat: number;
        lng: number;

        constructor(lat: number, lng: number) {
            this.lat = lat;
            this.lng = lng;
        }
    }

    const initialLocation: LatLng = new LatLng(44.6356313, -63.5951737);
    const [location, setLocation] = useState<LatLng>(initialLocation);

    // Effect hook for fetching listing details
    useEffect(() => {
        // Redirecting to login if token or userid is missing
        if (!token || !userid) {
            navigate('/login');
            toast.error('Unauthorized');
            return;
        }

        // Fetching listing details from the server
        toast.promise(
            axios.post("manage-listings/get", { listingId: state.listingId, editListing: false }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }), {
            pending: "Loading listing details",
            success: {
                render(data) {
                    setListing(data.data.data.data);
                    setLocation(new LatLng(data.data.data.data.location.coordinates[0], data.data.data.data.location.coordinates[1]));
                    // setImageString(Buffer.from(response.data.data.image.data).toString('base64'));
                    setImageString(data.data.data.data.image.data);
                    setContentType(`data:${data.data.data.data.image.contentType};base64,`);
                    return "Listing details fetched successfully";
                },
            },
            error: {
                // Handling unauthorized errors
                render(error: any) {
                    if (error.data.response.status === 403 || error.data.response.status === 401) {
                        navigate('/login');
                        return "Unauthorized"
                    };
                    return "Error loading listing details"
                }
            }
        });
        // eslint-disable-next-line
    }, []);

    // Default map zoom level
    const DEFAULT_MAP_ZOOM = 16;

    // Reference for map instance
    const map = useRef<Map | null>(null);

    // Effect hook for updating map view
    useEffect(() => {
        if (map?.current) {
            map.current?.on("click", (e) => {
                setLocation(new LatLng(e.latlng.lat, e.latlng.lng));
                map.current?.flyTo(
                    e.latlng,
                    map.current.getZoom() < DEFAULT_MAP_ZOOM
                        ? DEFAULT_MAP_ZOOM
                        : map.current.getZoom()
                );
            });
            map.current?.flyTo(
                location,
                map.current.getZoom() < DEFAULT_MAP_ZOOM
                    ? DEFAULT_MAP_ZOOM
                    : map.current.getZoom()
            );
        }
        // eslint-disable-next-line
    }, [map?.current]);

    return (
        <div className="mx-auto px-4 sm:py-24">
            <h1 className="text-4xl font-bold text-center mb-12 mt-8 sm:-mt-16 md:-mt-12 lg:-mt-12 md:text-left">View Listing</h1>
            {listing ?
                <>
                    <div className="h-auto max-w-lg lg:w-512 md:w-448 overflow-hidden flex-shrink-0 m-auto md:m-0 flex justify-center items-center">
                        {imageString ? <img src={contentType + imageString} alt="parking lot" className="h-auto w-full object-center" />
                            : <img src={ParkingLotImg} alt="parking lot" className="h-full w-full object-center lg:h-full lg:w-full" />}
                    </div>
                    <div className="mt-6">
                        <dl className="divide-gray-200 divide-y">
                            <div className="sm:grid-cols-3 sm:grid px-4 sm:px-0 py-6 sm:gap-4">
                                <dt className="font-bold text-sm">Name</dt>
                                <dd className="textPrimary sm:col-span-2 mt-1 sm:mt-0 text-sm">{listing.name}</dd>
                            </div>
                            <div className="sm:grid-cols-3 sm:grid px-4 sm:px-0 py-6 sm:gap-4">
                                <dt className="font-bold text-sm">Description</dt>
                                <dd className="textPrimary sm:col-span-2 mt-1 sm:mt-0 text-sm">{listing.description}</dd>
                            </div>
                            <div className="sm:grid-cols-3 sm:grid px-4 sm:px-0 py-6 sm:gap-4">
                                <dt className="font-bold text-sm">Street Address</dt>
                                <dd className="textPrimary sm:col-span-2 mt-1 sm:mt-0 text-sm">{listing.streetAddress}</dd>
                            </div>
                            <div className="sm:grid-cols-3 sm:grid px-4 sm:px-0 py-6 sm:gap-4">
                                <dt className="font-bold text-sm">City</dt>
                                <dd className="textPrimary sm:col-span-2 mt-1 sm:mt-0 text-sm">{listing.city}</dd>
                            </div>
                            <div className="sm:grid-cols-3 sm:grid px-4 sm:px-0 py-6 sm:gap-4">
                                <dt className="font-bold text-sm">Country</dt>
                                <dd className="textPrimary sm:col-span-2 mt-1 sm:mt-0 text-sm">{listing.country}</dd>
                            </div>
                            <div className="sm:grid-cols-3 sm:grid px-4 sm:px-0 py-6 sm:gap-4">
                                <dt className="font-bold text-sm">Postal Code</dt>
                                <dd className="textPrimary sm:col-span-2 mt-1 sm:mt-0 text-sm">{listing.postalCode}</dd>
                            </div>
                            <div className="sm:grid-cols-3 sm:grid px-4 sm:px-0 py-6 sm:gap-4">
                                <dt className="font-bold text-sm">Daily Rate</dt>
                                <dd className="textPrimary sm:col-span-2 mt-1 sm:mt-0 text-sm">{listing.dailyRate} CAD</dd>
                            </div>
                            <div className="sm:grid-cols-3 sm:grid px-4 sm:px-0 py-6 sm:gap-4">
                                <dt className="font-bold text-sm">Type</dt>
                                <dd className="textPrimary sm:col-span-2 mt-1 sm:mt-0 text-sm">{listing?.parkingType.charAt(0).toUpperCase() + listing?.parkingType.slice(1)}</dd>
                            </div>
                            <div className="sm:grid-cols-3 sm:grid px-4 sm:px-0 py-6 sm:gap-4">
                                <dt className="font-bold text-sm">Location</dt>
                                {location.lat !== 0 &&
                                    location.lng !== 0 ? (
                                    <div>
                                        {/* Rendering map */}
                                        <MapContainer className="mapBox"
                                            center={location}
                                            zoom={DEFAULT_MAP_ZOOM}
                                            ref={map}
                                        >
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                                            />
                                            {/* Marker for location */}
                                            <Marker position={location} icon={new Icon({ iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png" })} />
                                        </MapContainer>
                                    </div>
                                ) : null}
                            </div>
                        </dl>
                    </div>
                    <div className="flex items-center justify-center flex-col mb-8">
                        <button type="button" className="flex justify-center bg-buttonPrimary hover:bg-blue-700 text-white font-bold text-center mt-4 px-2 py-2 rounded" onClick={() => navigate('/manage-listings')}>Close</button>
                    </div>
                </> : <></>}
        </div>
    )
}

export default ViewListing;