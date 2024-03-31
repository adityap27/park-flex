/* Author: Shubham Patel */

// This component is responsible for editing a listing. 

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Icon, Map } from "leaflet";
import "./style.css";
import 'leaflet/dist/leaflet.css';
import axios from "axios";
import { toast } from "react-toastify";

const EditListing = () => {
    // Retrieving user token and ID from local storage
    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('userId');

    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [postalCode, setPostalCode] = useState<string>("");
    const [rate, setRate] = useState<string>("");
    const [type, setType] = useState<string>("outdoor");
    const [error, setError] = useState({
        name: "",
        description: "",
        address: "",
        rate: "",
        country: "",
        postalCode: "",
        city: "",
        image: "",
        location: ""
    });
    const { state } = useLocation();

    const [submitting, setSubmitting] = useState(false);

    // Default map zoom level
    const DEFAULT_MAP_ZOOM = 16;

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

    // Reference for map instance
    const map = useRef<Map | null>(null);

    // Function to display error message for input field
    const showError = (inputField: string, message: string) => {
        setError((prevError) => ({ ...prevError, [inputField]: message }));
    };

    // Function to remove error message for input field
    const showSuccess = (inputField: string) => {
        setError((prevError) => ({ ...prevError, [inputField]: "" }));
    };

    // Effect hook for editing listing
    useEffect(() => {
        // Redirecting to login if token or userid is missing
        if (!token || !userid) {
            navigate('/login');
            toast.error('Unauthorized');
            return;
        }

        if (submitting) {
			for (const [key, value] of Object.entries(error)) {
				if (value.length > 0) {
					toast.error(value);
					break;
				}
			}
		}

        if (Object.values(error).every((error) => error === "") && submitting) {

            let json_data = {
                listingId: state.listingId,
                name: name,
                streetAddress: address,
                country: country,
                city: city,
                description: description,
                rate: rate,
                postalCode: postalCode,
                location: (location.lat + ':' + location.lng).toString(),
                type: type
            }

            axios.put('manage-listings/edit', json_data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                if (response.data.success) {
                    toast.success('Listing edited successfully');
                    navigate('/manage-listings');
                }
            }).catch(error => {
                // Handling errors during edit
                if (error.response.status === 403 || error.response.status === 401) {
                    navigate('/login');
                    toast.error('Unauthorized');
                } else {
                    toast.error('Error updating listing');
                    console.error('Error updating listing: ', error);
                }
            });
        }
        // eslint-disable-next-line
    }, [error]);

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
            axios.post("manage-listings/get", { listingId: state.listingId, editListing: true }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }), {
            pending: "Loading listing details",
            success: {
                render(data) {
                    setName(data.data.data.data.name);
                    setDescription(data.data.data.data.description);
                    setAddress(data.data.data.data.streetAddress);
                    setRate(data.data.data.data.dailyRate);
                    setCountry(data.data.data.data.country);
                    setPostalCode(data.data.data.data.postalCode);
                    setCity(data.data.data.data.city);
                    setLocation(new LatLng(data.data.data.data.location.coordinates[0], data.data.data.data.location.coordinates[1]));
                    setType(data.data.data.data?.parkingType);
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

    // Function to check required input fields
    const checkRequired = (inputField: string, value: string) => {
        if (inputField === "rate") {
            if (value === "") {
                showError(inputField, "Daily Rate is required");
            } else if (parseFloat(value) <= 0) {
                showError(inputField, "Daily Rate should be positive");
            } else {
                showSuccess(inputField);
            }
        } else {
            if (value === "") {
                showError(inputField, `${getFieldName(inputField)} is required`);
            } else if (value !== value.trim()) {
                showError(inputField, `${getFieldName(inputField)} contains space at start and end`);
            } else {
                showSuccess(inputField);
            }
        }
    };

    // Function to get field name
    const getFieldName = (inputField: string) => {
        return inputField.charAt(0).toUpperCase() + inputField.slice(1);
    };

    // Function to handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        checkRequired("name", name);
        checkRequired("description", description);
        checkRequired("address", address);
        checkRequired("country", country);
        checkRequired("city", city);
        checkRequired("postalCode", postalCode);
        checkRequired("rate", rate);
        setSubmitting(true);
    };

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
        <>
            <form id="form" className="form" onSubmit={handleSubmit} autoComplete="off">
                <h1 className="text-4xl font-bold text-center mb-8">Edit Listing</h1>
                <div className="container">
                    <div className="left-column">
                        {/* <div className={`form-control ${error.name ? "error" : "success"}`}> */}
                        <div className={`form-control success`}>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {/* <small>{error.name}</small> */}
                        </div>
                        <div className={`form-control success`}>
                            <label htmlFor="address">Street Address</label>
                            <input
                                type="text"
                                id="address"
                                placeholder="Enter Street Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            {/* <small>{error.address}</small> */}
                        </div>
                        <div className={`form-control success`}>
                            <label htmlFor="address">Country</label>
                            <input
                                type="text"
                                id="country"
                                placeholder="Enter Country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                            {/* <small>{error.country}</small> */}
                        </div>
                        <div className={`form-control success`}>
                            <label htmlFor="address">City</label>
                            <input
                                type="text"
                                id="city"
                                placeholder="Enter City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            {/* <small>{error.city}</small> */}
                        </div>
                        <div className="ml-3 mt-7 mb-5">
                            <label htmlFor="parking-type">Type:</label>
                            <label className="ml-5">
                                <input
                                    type="radio"
                                    value="indoor"
                                    checked={type === "indoor"}
                                    className="mr-2"
                                    onChange={() => { setType("indoor") }}
                                />
                                Indoor
                            </label>
                            <label className="ml-3">
                                <input
                                    type="radio"
                                    value="outdoor"
                                    checked={type === "outdoor"}
                                    className="mr-2"
                                    onChange={() => { setType("outdoor") }}
                                />
                                Outdoor
                            </label>
                        </div>
                    </div>
                    <div className="right-column">
                        <div className={`form-control success`}>
                            <label htmlFor="description">Description</label>
                            <input
                                id="description"
                                placeholder="Enter Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            {/* <small>{error.description}</small> */}
                        </div>
                        <div className={`form-control success`}>
                            <label htmlFor="address">Daily Rate</label>
                            <input
                                // type="number"
                                id="rate"
                                placeholder="Enter Daily Rate"
                                value={rate}
                                onChange={(e) => setRate(e.target.value.replace(/[^0-9]/g, ""))}
                            />
                            {/* <small>{error.rate}</small> */}
                        </div>
                        <div className={`form-control success`}>
                            <label htmlFor="address">Postal Code</label>
                            <input
                                type="text"
                                id="postalCode"
                                placeholder="Enter Postal Code"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                            {/* <small>{error.postalCode}</small> */}
                        </div>
                    </div>
                    <div className="map">
                        <p style={{ textAlign: "left" }}>Select Location</p>
                        {/* Rendering map */}
                        {location.lat !== 0 &&
                            location.lng !== 0 ? (
                            <MapContainer className="map-box"
                                center={location}
                                zoom={DEFAULT_MAP_ZOOM}
                                style={{ height: "400px" }}
                                ref={map}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                                />
                                {/* Marker for location */}
                                <Marker position={location} icon={new Icon({ iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png" })} />
                            </MapContainer>
                        ) : null}
                    </div>
                    <div className="flex items-center justify-center flex-col md:flex-row">
                        <button type="submit" className="flex justify-center bg-buttonPrimary hover:bg-blue-700 text-white font-bold text-center mt-10 mb-4 md:mb-10 md:mr-4 px-2 py-2 rounded">Save</button>
                        <button type="button" className="flex justify-center bg-buttonPrimary hover:bg-blue-700 text-white font-bold text-center mt-4 md:mt-10 mb-10 px-2 py-2 rounded" onClick={() => navigate('/manage-listings')}>Close</button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default EditListing;