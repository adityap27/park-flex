import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Icon, Map } from "leaflet";
import "./style.css";
import 'leaflet/dist/leaflet.css';

export const CreateListing = () => {
	const navigate = useNavigate();
	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	const [country, setCountry] = useState<string>("");
	const [city, setCity] = useState<string>("");
	const [postalCode, setPostalCode] = useState<string>("");
	const [rate, setRate] = useState<string>("");
	const [image, setImage] = useState<string>("");
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
		if (Object.values(error).every((error) => error === "") && submitting) {
			navigate("/success");
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
		checkRequired("image", image);
		setSubmitting(true);
	};

	const onImageChange = (event: any) => {
		if (event.target.files && event.target.files[0]) {
			setImage(URL.createObjectURL(event.target.files[0]));
		}
	}

	const getCurrentLocation = useCallback(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				setLocation(new LatLng(position.coords.latitude, position.coords.longitude));
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
							<label htmlFor="address">Monthly Rate</label>
							<input
								type="number"
								id="rate"
								placeholder="Enter Monthly Rate"
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
							<MapContainer className="map-box"
								center={location}
								zoom={DEFAULT_MAP_ZOOM}
								style={{ height: "400px"}}
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
					<div className="flex items-center justify-center flex-col md:flex-row">
                        <button type="submit" className="flex justify-center bg-buttonPrimary hover:bg-blue-700 text-white font-bold text-center mt-10 mb-4 md:mb-10 md:mr-4 px-6 py-4 rounded">Submit</button>
                        <button type="button" className="flex justify-center bg-buttonPrimary hover:bg-blue-700 text-white font-bold text-center mt-4 md:mt-10 mb-10 px-6 py-4 rounded" onClick={() => navigate('/')}>Close</button>
                    </div>
				</div>
			</form>
		</>
	);
};

export default CreateListing;
