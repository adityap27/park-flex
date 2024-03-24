import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Icon, Map } from "leaflet";
import "./style.css";
import 'leaflet/dist/leaflet.css';
import axios from "axios";

export const CreateListing = () => {
	const navigate = useNavigate();
	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	const [country, setCountry] = useState<string>("");
	const [city, setCity] = useState<string>("");
	const [postalCode, setPostalCode] = useState<string>("");
	const [rate, setRate] = useState<string>("");
	const [image, setImage] = useState<File | null>(null);
	const [error, setError] = useState({
		name: "",
		description: "",
		address: "",
		country: "",
		city: "",
		postalCode: "",
		rate: "",
		image: "",
		location: ""
	});
	const [isLocationSelected, setIsLocationSelected] = useState<boolean>(false);

	const [submitting, setSubmitting] = useState(false);


	const DEFAULT_MAP_ZOOM = 16;

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
	const map = useRef<Map | null>(null);

	const showError = (inputField: string, message: string) => {
		setError((prevError) => ({ ...prevError, [inputField]: message }));
	};

	const showSuccess = (inputField: string) => {
		setError((prevError) => ({ ...prevError, [inputField]: "" }));
	};

	useEffect(() => {
		if (!image) return;

		if (Object.values(error).every((error) => error === "") && submitting) {
			const formData = new FormData();
			formData.append('userId', '65fb948e17a0912641e6b9d4');
			formData.append('name', name);
			formData.append('description', description);
			formData.append('streetAddress', address)
			formData.append('country', country);
			formData.append('city', city);
			formData.append('postalCode', postalCode);
			formData.append('rate', rate);
			formData.append('location', location.lat + ':' + location.lng);
			formData.append('image', image);

			axios.post('http://localhost:3001/api/manage-listings/create', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}).then(response => {
				if (response.data.success){
					navigate('/manage-listings');
				}
			}).catch(error => {
				console.error('Error creating listing: ', error);
			});
		}
		// eslint-disable-next-line
	}, [error]);

	const checkRequired = (inputField: string, value: string) => {
		if (inputField === "rate") {
			if (value === "") {
				showError(inputField, `${getFieldName(inputField)} is required`);
			} else if (parseFloat(value) <= 0) {
				showError(inputField, `${getFieldName(inputField)} should be positive`);
			} else {
				showSuccess(inputField);
			}
		} else {
			if (value === "") {
				showError(inputField, `${getFieldName(inputField)} is required`);
			} else {
				showSuccess(inputField);
			}
		}
	};

	const checkFile = (inputField: string, value: any) => {
		if (value == null) {
			showError(inputField, `${getFieldName(inputField)} is required`);
		} else {
			showSuccess(inputField);
		}
	};

	const checkLocation = (inputField: string, value: boolean) => {
		if(value === false) {
			showError(inputField, `${getFieldName(inputField)} is required`);
			document.getElementById("location")?.classList.remove("border-gray-300");
			document.getElementById("location")?.classList.add("border-red-500");
		} else {
			showSuccess(inputField);
			document.getElementById("location")?.classList.remove("border-red-500");
			document.getElementById("location")?.classList.add("border-gray-300");
		}
	}

	const getFieldName = (inputField: string) => {
		return inputField.charAt(0).toUpperCase() + inputField.slice(1);
	};

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

	const getCurrentLocation = useCallback(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				setLocation(new LatLng(position.coords.latitude, position.coords.longitude));
				setIsLocationSelected(true);
			});
		}
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		getCurrentLocation();
	}, [getCurrentLocation]);

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
						<div className={`form-control ${error.name ? "error" : "success"}`}>
							<label htmlFor="name">Name</label>
							<input
								type="text"
								id="name"
								placeholder="Enter Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<small>{error.name}</small>
						</div>
						<div className={`form-control ${error.address ? "error" : "success"}`}>
							<label htmlFor="address">Street Address</label>
							<input
								type="text"
								id="address"
								placeholder="Enter Street Address"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
							<small>{error.address}</small>
						</div>
						<div className={`form-control ${error.country ? "error" : "success"}`}>
							<label htmlFor="address">Country</label>
							<input
								type="text"
								id="country"
								placeholder="Enter Country"
								value={country}
								onChange={(e) => setCountry(e.target.value)}
							/>
							<small>{error.country}</small>
						</div>
						<div className={`form-control ${error.city ? "error" : "success"}`}>
							<label htmlFor="address">City</label>
							<input
								type="text"
								id="city"
								placeholder="Enter City"
								value={city}
								onChange={(e) => setCity(e.target.value)}
							/>
							<small>{error.city}</small>
						</div>
					</div>
					<div className="right-column">
						<div className={`form-control ${error.description ? "error" : "success"}`}>
							<label htmlFor="description">Description</label>
							<input
								id="description"
								placeholder="Enter Description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
							<small>{error.description}</small>
						</div>
						<div className={`form-control ${error.rate ? "error" : "success"}`}>
							<label htmlFor="address">Daily Rate</label>
							<input
								type="number"
								id="rate"
								placeholder="Enter Daily Rate"
								value={rate}
								onChange={(e) => setRate(e.target.value)}
							/>
							<small>{error.rate}</small>
						</div>
						<div className={`form-control ${error.postalCode ? "error" : "success"}`}>
							<label htmlFor="address">Postal Code</label>
							<input
								type="text"
								id="postalCode"
								placeholder="Enter Postal Code"
								value={postalCode}
								onChange={(e) => setPostalCode(e.target.value)}
							/>
							<small>{error.postalCode}</small>
						</div>
						<div className={`form-control ${error.image ? "error" : "success"}`}>
							<label htmlFor="address">Image</label>
							<input
								type="file"
								id="image"
								onChange={onImageChange}
							/>
							<small>{error.image}</small>
						</div>
					</div>
					<div className="map">
						<p style={{ textAlign: "left" }}>Select Location</p>
						{location.lat !== 0 &&
							location.lng !== 0 ? (
							<>
							<div id="location" className="border-1 border-gray-300">
							<MapContainer className="map-box"
								center={location}
								zoom={DEFAULT_MAP_ZOOM}
								style={{ height: "400px" , width: "100%"}}
								ref={map}
							>
								<TileLayer
									attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
									url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
								/>
								<Marker position={location} icon={new Icon({ iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png" })} />
							</MapContainer>
							</div>
							<small className="text-red-500">{error.location}</small>
							</>
						) : null}
					</div>
					<div className="flex items-center justify-center flex-col md:flex-row">
						<button type="submit" className="flex justify-center bg-buttonPrimary hover:bg-blue-700 text-white font-bold text-center mt-10 mb-4 md:mb-10 md:mr-4 px-6 py-4 rounded">Submit</button>
						<button type="button" className="flex justify-center bg-buttonPrimary hover:bg-blue-700 text-white font-bold text-center mt-4 md:mt-10 mb-10 px-6 py-4 rounded" onClick={() => navigate('/manage-listings')}>Close</button>
					</div>
				</div>
			</form>
		</>
	);
};

export default CreateListing;