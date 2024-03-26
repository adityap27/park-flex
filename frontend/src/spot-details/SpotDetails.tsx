import { Icon, LatLng } from "leaflet";
import Calendar from "react-calendar";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { FaShare } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRequest } from "../utils/network-manager/axios";
import StarRatings from "react-star-ratings";
import dayjs from "dayjs";
import { formatToTwoPrecisionFloat } from "../utils/number-utils";
import { toast } from "react-toastify";
import { ParkingSpot } from "../home-page/Home";

export const SpotDetails = () => {
  const params = useParams();

  const [parkingSpotDetails, setParkingSpotDetails] = useState<
    ParkingSpot | undefined
  >(undefined);

  useEffect(() => {
    if (params.id) {
      toast.promise(
        getRequest<{
          success: boolean;
          data: ParkingSpot;
        }>("parking-listings/" + params.id),
        {
          pending: "Loading parking spot details",
          success: {
            render(data) {
              setParkingSpotDetails(data.data.data.data);
              return "Successfully fetched parking spot details";
            },
          },
          error: "Error loading parking spot details",
        }
      );
    }
  }, [params]);

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [numberOfDays, setNumberOfDays] = useState(0);

  return (
    <>
      <div className='flex flex-col flex-1'>
        {parkingSpotDetails ? (
          <div className='flex-1 flex flex-col'>
            <div className='flex flex-col md:flex-row w-full justify-between items-center md:px-4 py-2  bg-footer'>
              <h3 className='flex-1 lg:flex-[2] text-textSecondary'>
                {parkingSpotDetails.name}
              </h3>
              <div className='grid w-full grid-cols-4 md:flex  md:flex-row justify-between flex-1'>
                <h5
                  className='flex flex-row items-center justify-center cursor-pointer text-textSecondary'
                  onClick={() => {
                    document.getElementById("details")?.scrollIntoView();
                  }}
                >
                  Details
                </h5>
                <h5
                  className='flex flex-row items-center justify-center cursor-pointer text-textSecondary'
                  onClick={() => {
                    document.getElementById("availability")?.scrollIntoView();
                  }}
                >
                  Availability
                </h5>
                <h5
                  className='flex flex-row items-center justify-center cursor-pointer text-textSecondary'
                  onClick={() => {
                    document.getElementById("location")?.scrollIntoView();
                  }}
                >
                  Location
                </h5>
                <h5
                  className='flex flex-row items-center justify-center cursor-pointer text-textSecondary'
                  onClick={() => {
                    navigator.share({
                      text: "url to be shared",
                    });
                  }}
                >
                  <span className='mr-1'>
                    <FaShare />
                  </span>
                  Share
                </h5>
              </div>
            </div>
            <div
              className='w-full flex flex-row items-center justify-center'
              style={{
                background: `url(data:image/png;base64,${parkingSpotDetails.image.data})`,
                backgroundSize: "contain",
              }}
            >
              <div
                className='w-full flex flex-row items-center justify-center'
                style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
              >
                <img
                  src={`data:image/png;base64,${parkingSpotDetails.image.data}`}
                  className='h-[400px] object-contain'
                  loading='lazy'
                  alt={parkingSpotDetails.name}
                />
              </div>
            </div>
            <div className='flex flex-col md:flex-row m-4' id='details'>
              <div className='flex-1 md:border-r-[2px] md:border-borderColor md:mr-2 animate__animated  animate__slideInLeft'>
                <div className='flex flex-col mb-8 md:mb-0 md:mr-8 z-10 shadow-lg bg-backgroundColor flex-auto rounded-md '>
                  <div className='flex flex-col p-4'>
                    <h4 className='text-textPrimary'>Spot details</h4>
                    <p className='text-textPrimary'>
                      Name : {parkingSpotDetails.name}
                    </p>
                    <p className='text-textPrimary'>
                      Description : {parkingSpotDetails.description}
                    </p>
                    <p className='text-textPrimary'>
                      Parking Type : {parkingSpotDetails.parkingType}
                    </p>
                    <p className='text-textPrimary'>Timing : Whole day</p>
                    <p className='text-textPrimary'>
                      Owner :{" "}
                      {(parkingSpotDetails.owner?.firstName || "") +
                        " " +
                        (parkingSpotDetails.owner?.lastName || "")}
                    </p>
                    <div className='flex flex-row items-center'>
                      <p className='text-textPrimary mt-1'>{5}</p>
                      <div className='ml-2'>
                        <StarRatings
                          rating={5}
                          numberOfStars={5}
                          starDimension='20px'
                          starRatedColor='#0a0944'
                        />
                      </div>
                    </div>
                    <p className='underline cursor-pointer text-textPrimary'>
                      {50} Reviews
                    </p>
                  </div>
                  <hr className='bg-borderColor m-0 opacity-100' />
                  <div className='flex flex-col p-4'>
                    <h4 className='text-textPrimary'>Spot Address</h4>
                    <p className='text-textPrimary'>
                      {parkingSpotDetails.streetAddress}
                    </p>
                    <p className='text-textPrimary'>
                      {parkingSpotDetails.city}
                    </p>
                    <p className='text-textPrimary'>
                      {parkingSpotDetails.postalCode}{" "}
                      {parkingSpotDetails.country}
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex-1 flex-grow animate__animated  animate__slideInRight'>
                <div className='flex flex-col h-full md:ml-4 z-10 shadow-lg bg-backgroundColor rounded-md'>
                  <div className='flex flex-col flex-1 px-4 pt-4 pb-3 w-full'>
                    <h4 className='text-textPrimary text-lg font-semibold'>
                      ${parkingSpotDetails.dailyRate}/day
                    </h4>
                    <div className='flex flex-row w-full mt-2'>
                      <div className='flex flex-col flex-1 pr-6'>
                        <h6 className='text-textPrimary'>Start</h6>
                        <input
                          type='date'
                          className='bg-borderColor text-textSecondary mt-2 px-2 py-2 z-20 shadow-md rounded-md cursor-pointer'
                          value={dayjs(startDate).format("YYYY-MM-DD")}
                          onChange={(e) => {
                            const diff = dayjs(endDate).diff(
                              e.target.valueAsDate,
                              "day"
                            );
                            if (diff <= 0) {
                              return;
                            }
                            setStartDate(e.target.valueAsDate || undefined);
                            setNumberOfDays(diff);
                          }}
                        />
                      </div>
                      <div className='flex flex-col flex-1'>
                        <h6 className='text-textPrimary'>End</h6>
                        <input
                          type='date'
                          className='bg-borderColor text-textSecondary px-2 py-2 mt-2 z-20 shadow-md rounded-md cursor-pointer'
                          value={dayjs(endDate).format("YYYY-MM-DD")}
                          onChange={(e) => {
                            const diff = dayjs(e.target.valueAsDate).diff(
                              startDate,
                              "day"
                            );
                            if (diff <= 0) {
                              return;
                            }
                            setEndDate(e.target.valueAsDate || undefined);
                            setNumberOfDays(diff);
                          }}
                        />
                      </div>
                    </div>
                    <button
                      className='w-full text-center py-3 mt-4 bg-header text-textSecondary rounded-lg z-20 shadow-md'
                      onClick={() => {
                        if (numberOfDays === 0) {
                          toast("Please select dates", {
                            type: "error",
                          });
                        } else {
                          toast("Your reservation is done", {
                            type: "success",
                          });
                        }
                      }}
                    >
                      Proceed to booking
                    </button>
                  </div>
                  <div className='flex flex-row w-full px-4 py-2 justify-between'>
                    <h5 className='text-textPrimary'>
                      Sub total : ${parkingSpotDetails.dailyRate} *{" "}
                      {numberOfDays}
                    </h5>
                    <h5 className='text-textPrimary'>
                      ${" "}
                      {formatToTwoPrecisionFloat(
                        parkingSpotDetails.dailyRate * numberOfDays
                      )}
                    </h5>
                  </div>
                  <hr className='bg-black opacity-100 m-0' />
                  <div className='flex flex-row w-full px-4 py-2 justify-between'>
                    <h3 className='text-textPrimary text-2xl font-bold'>
                      Total
                    </h3>
                    <h3 className='text-textPrimary text-2xl font-bold'>
                      ${" "}
                      {formatToTwoPrecisionFloat(
                        parkingSpotDetails.dailyRate * numberOfDays
                      )}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div
              className='flex flex-col m-4 animate__animated  animate__slideInLeft'
              id='availability'
            >
              <h4 className='text-textPrimary'>Availability</h4>
              <div className='hidden md:block'>
                <Calendar
                  showDoubleView={true}
                  className='border-0 z-50 shadow-lg rounded-md !bg-backgroundColor text-textPrimary'
                  tileDisabled={(date) => date.date.getDate() % 4 === 0}
                />
              </div>
              <div className='block md:hidden'>
                <Calendar
                  showDoubleView={false}
                  className='border-0 z-50 shadow-lg rounded-md !bg-backgroundColor text-textPrimary'
                  tileDisabled={(date) => date.date.getDate() % 4 === 0}
                />
              </div>
            </div>
            <div
              className='flex flex-col m-4 animate__animated  animate__slideInRight'
              id='location'
            >
              <h4 className='text-textPrimary'>Location</h4>
              <div className='w-full aspect-square md:h-[400px] border-1 border-textPrimary'>
                <MapContainer
                  center={
                    new LatLng(
                      parkingSpotDetails.location.coordinates[0],
                      parkingSpotDetails.location.coordinates[1]
                    )
                  }
                  zoom={15}
                  className='h-full w-full'
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  />
                  <Marker
                    position={
                      new LatLng(
                        parkingSpotDetails.location.coordinates[0],
                        parkingSpotDetails.location.coordinates[1]
                      )
                    }
                    icon={
                      new Icon({
                        iconUrl:
                          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
                      })
                    }
                  >
                    <Popup className='text-textPrimary'>
                      <p className='text-textPrimary'>
                        {parkingSpotDetails.streetAddress}
                      </p>
                      <p className='text-textPrimary'>
                        {parkingSpotDetails.city}
                      </p>
                      <p className='text-textPrimary'>
                        {parkingSpotDetails.postalCode}
                      </p>
                      <p className='text-textPrimary'>
                        {parkingSpotDetails.country}
                      </p>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
