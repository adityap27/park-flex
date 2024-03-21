import { Icon, Map } from "leaflet";
import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import ParkingLotImg from "../assets/images/parking-spot.jpg";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import axios from "axios";
import {Buffer} from 'buffer';

const ViewListing = () => {
    const navigate = useNavigate();
    // const [name, setName] = useState<string>("");
    // const [description, setDescription] = useState<string>("");
    // const [address, setAddress] = useState<string>("");
    // const [country, setCountry] = useState<string>("");
    // const [city, setCity] = useState<string>("");
    // const [postalCode, setPostalCode] = useState<string>("");
    // const [rate, setRate] = useState<string>("");
    const [listing, setListing] = useState<any>();
    const [imageString, setImageString] = useState<string>(ParkingLotImg);
    const [contentType, setContentType] = useState<string>("data:image/jpeg;base64,");
    const { state } = useLocation();

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

    useEffect(() => {
        axios.post("http://localhost:3001/api/manage-listings/get", {listingId: state.listingId}, {
            headers: {
                'Content-Type': 'application/json'
            }}).then(response => {
            if (response.data.success) {
                setListing(response.data.data);
                setLocation(new LatLng(response.data.data.location.coordinates[0], response.data.data.location.coordinates[1]));
                setImageString(Buffer.from(response.data.data.image.data).toString('base64'));
                setContentType(`data:${response.data.data.image.contentType};base64,`);
            }
        }).catch(error => {
            console.error('Error fetching listings: ', error);
        });
        // eslint-disable-next-line
    }, []);

    const DEFAULT_MAP_ZOOM = 16;

    const map = useRef<Map | null>(null);

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
        <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-5 ml-16">
            <h1 className="text-4xl font-bold text-center mb-8 md:-mt-2 lg:-mt-12 md:text-left md:mr-auto">View Listing</h1>
            {listing ? 
            <>
            <div className="h-50 w-50 overflow-hidden flex-shrink-0 m-auto sm:m-0 flex justify-center items-center">
                {imageString ? <img src={contentType+imageString} alt="parking lot" className="h-full w-full object-center lg:h-full lg:w-full" />
                : <img src={ParkingLotImg} alt="parking lot" className="h-full w-full object-center lg:h-full lg:w-full" />}
                
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Name</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{listing.name}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Description</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{listing.description}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Street Address</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{listing.streetAddress}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">City</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{listing.city}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Country</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{listing.country}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Postal Code</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{listing.postalCode}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Daily Rate</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{listing.dailyRate} CAD</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Location</dt>
                        {location.lat !== 0 &&
                            location.lng !== 0 ? (
                            <MapContainer className="map-box"
                                center={location}
                                zoom={DEFAULT_MAP_ZOOM}
                                style={{ height: "300px", width: "700px", zIndex: "-1" }}
                                ref={map}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                                />
                                <Marker position={location} icon={new Icon({ iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png" })} />
                            </MapContainer>
                        ) : null}
                    </div>
                </dl>
            </div>
            <div className="flex items-center justify-center flex-col md:flex-row">
                <button type="button" className="flex justify-center bg-buttonPrimary hover:bg-blue-700 text-white font-bold text-center mt-4 md:mt-10 px-6 py-4 rounded" onClick={() => navigate('/manage-listings')}>Close</button>
            </div>
            </> : <></>}
        </div>
    )
}
export default ViewListing;