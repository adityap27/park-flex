/* Author: Shubham Patel */

// This component is responsible for creating a listing. 

import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Icon, Map, LatLng } from "leaflet";
import "./style.css";
import 'leaflet/dist/leaflet.css';
import axios from "axios";
import { toast } from "react-toastify";

export const CreateListing = () => {
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
	const [image, setImage] = useState<File | null>(null);
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
	const [isLocationSelected, setIsLocationSelected] = useState<boolean>(false);

	const [submitting, setSubmitting] = useState(false);

	// Default map zoom level
	const DEFAULT_MAP_ZOOM = 14;

	const MAX_IMAGE_SIZE_IN_BYTES = 1 * 1024 * 1024;

	const [location, setLocation] = useState<LatLng>(new LatLng(44.6356313, -63.5951737));

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

	// Effect hook to set default location when component mounts
	useEffect(() => {
		setLocation(new LatLng(44.6356313, -63.5951737));
	}, []);

	// Effect hook for creating listing
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

		if (!image) return;

		if (Object.values(error).every((error) => error === "") && submitting) {
			const formData = new FormData();
			formData.append('userId', userid);
			formData.append('name', name);
			formData.append('description', description);
			formData.append('streetAddress', address)
			formData.append('country', country);
			formData.append('city', city);
			formData.append('postalCode', postalCode);
			formData.append('rate', rate);
			formData.append('location', location.lat + ':' + location.lng);
			formData.append('image', image);
			formData.append('type', type);

			axios.post('manage-listings/create', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'Authorization': `Bearer ${token}`
				}
			}).then(response => {
				if (response.data.success) {
					toast.success('Listing created successfully');
					navigate('/manage-listings');
				}
			}).catch(error => {
				// Handling errors during creation
				if (error.response.status === 403 || error.response.status === 401) {
					navigate('/login');
					toast.error('Unauthorized');
				} else {
					toast.error('Error creating listing');
					console.error('Error creating listing: ', error);
				}
			});
		}
		// eslint-disable-next-line
	}, [error]);

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
			}
			else {
				showSuccess(inputField);
			}
		}
	};
	
	// Function to check required file input
	const checkFile = (inputField: string, value: any) => {
		if (value == null) {
			showError(inputField, `${getFieldName(inputField)} is required`);
		} else if (value.size > MAX_IMAGE_SIZE_IN_BYTES) {
			showError(inputField, "Max allowed image size if 1 MB");
		} else {
			showSuccess(inputField);
		}
	};

	// Function to check if location is selected
	const checkLocation = (inputField: string, value: boolean) => {
		if (value === false) {
			showError(inputField, `${getFieldName(inputField)} is required`);
			// document.getElementById("location")?.classList.remove("border-gray-300");
			// document.getElementById("location")?.classList.add("border-red-500");
		} else {
			showSuccess(inputField);
			// document.getElementById("location")?.classList.remove("border-red-500");
			// document.getElementById("location")?.classList.add("border-gray-300");
		}
	}

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
		checkFile("image", image);
		checkLocation("location", isLocationSelected);
		setSubmitting(true);
	};

	// Function to handle image file change
	const onImageChange = (event: any) => {
		if (event.target.files && event.target.files.length > 0) {
			setImage(event.target.files[0]);
			//setImage(URL.createObjectURL(event.target.files[0]));
			// const reader = new FileReader();
			// reader.readAsDataURL(event.target.files[0]);
			// reader.onload = () => {
			// 	if (typeof reader.result === "string") {
			// 	setImage(reader.result);
			// 	}
			// };
		}
	}

	// Function to get current user's location
	const getCurrentLocation = useCallback(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				setLocation(new LatLng(position.coords.latitude, position.coords.longitude));
				setIsLocationSelected(true);
			});
		}
		// eslint-disable-next-line
	}, []);

	// Effect hook to get current user's location when component mounts
	useEffect(() => {
		getCurrentLocation();
	}, [getCurrentLocation]);

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
				setIsLocationSelected(true);
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
				<h1 className="text-4xl font-bold text-center mb-8">Create Listing</h1>
				<div className="container">
					<div className="left-column">
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
							<label className="ml-3">
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
						<div className={`form-control success`}>
							<label htmlFor="address">Image</label>
							<input
								type="file"
								id="image"
								onChange={onImageChange}
								accept="image/*"
							/>
							{/* <small>{error.image}</small> */}
						</div>
					</div>
					<div className="map">
						<p style={{ textAlign: "left" }}>Select Location</p>
						{location.lat !== 0 &&
							location.lng !== 0 ? (
							<>
								<div id="location" className="border-1 border-gray-300">
									{/* Rendering map */}
									<MapContainer className="map-box"
										center={location}
										zoom={DEFAULT_MAP_ZOOM}
										style={{ height: "400px", width: "100%" }}
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
								{/* <small className="text-red-500">{error.location}</small> */}
							</>
						) : null}
					</div>
					<div className="flex items-center justify-center flex-col md:flex-row">
						<button type="submit" className="flex justify-center bg-buttonPrimary hover:bg-blue-700 text-white font-bold text-center mt-10 mb-4 md:mb-10 md:mr-4 px-2 py-2 rounded">Submit</button>
						<button type="button" className="flex justify-center bg-buttonPrimary hover:bg-blue-700 text-white font-bold text-center mt-4 md:mt-10 mb-10 px-2 py-2 rounded" onClick={() => navigate('/manage-listings')}>Close</button>
					</div>
				</div>
			</form>
		</>
	);
};

export default CreateListing;