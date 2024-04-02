/**
 * Author : Ketul Patel
 * This page shows parking spots in details with existing booking dates, reviews and location etc.
 */
import { Icon, LatLng } from "leaflet";
import Calendar from "react-calendar";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { FaHeart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getRequest, postRequest } from "../utils/network-manager/axios";
import StarRatings from "react-star-ratings";
import dayjs from "dayjs";
import { formatToTwoPrecisionFloat } from "../utils/number-utils";
import { toast } from "react-toastify";
import { ParkingSpot } from "../home-page/Home";
import { Link } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

interface ParkingSpotDetails {
  parkingSpot: ParkingSpot;
  totalReviews: number;
  reviewAverage: number;
  existingBookings: ExistingBooking[];
  isWishListed: boolean;
}

interface ExistingBooking {
  startDate: Date;
  endDate: Date;
}

export const SpotDetails = () => {
  const userId = localStorage.getItem("userId");
  const { token } = useAuthStore();
  const params = useParams();
  const navigate = useNavigate();

  const [parkingSpotDetails, setParkingSpotDetails] = useState<
    ParkingSpotDetails | undefined
  >(undefined);

  const _fetchListing = useCallback(async () => {
    return getRequest<{
      success: boolean;
      data: ParkingSpotDetails;
    }>("parking-listings/" + params.id);
  }, [params]);

  useEffect(() => {
    const _init = async () => {
      if (params.id) {
        const response = await toast.promise(_fetchListing(), {
          pending: "Loading parking spot details",
          success: "Successfully fetched details",
          error: "Error loading parking spot details",
        });
        if (response.data) {
          setParkingSpotDetails(response.data.data);
        }
      }
    };

    _init();
  }, [_fetchListing, params]);

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const _validateDetails = () => {
    if (startDate === undefined || endDate === undefined) {
      toast("Please select dates", {
        type: "error",
      });
      return;
    }
    const numberOfDays = dayjs(endDate).isSame(dayjs(startDate), "day")
      ? 1
      : dayjs(endDate).diff(dayjs(startDate), "day");
    if (numberOfDays === 0) {
    }
    if (numberOfDays <= 0) {
      toast("End date should be greater than Start date", {
        type: "error",
      });
      return;
    }
    let validationFailed = false;
    parkingSpotDetails?.existingBookings.forEach((item) => {
      const itemStartDate = dayjs(item.startDate);
      const itemEndDate = dayjs(item.endDate);

      const localStartDate = dayjs(startDate);
      const localEndDate = dayjs(endDate);

      if (
        localStartDate.isSame(itemStartDate, "date") ||
        localStartDate.isSame(itemEndDate, "date") ||
        (localStartDate.isAfter(itemStartDate, "date") &&
          localStartDate.isBefore(itemEndDate, "date")) ||
        localEndDate.isSame(itemStartDate, "date") ||
        localEndDate.isSame(itemEndDate, "date") ||
        (localEndDate.isAfter(itemStartDate, "date") &&
          localEndDate.isBefore(itemEndDate, "date"))
      ) {
        validationFailed = true;
        return;
      }
    });

    if (validationFailed) {
      toast(
        "There is already booking between these dates, please select other dates",
        {
          type: "error",
        }
      );
      return;
    }

    navigate("/confirmbooking", {
      state: {
        parkingSpot: parkingSpotDetails?.parkingSpot,
        totalPrice: formatToTwoPrecisionFloat(
          (parkingSpotDetails?.parkingSpot?.dailyRate || 0) * numberOfDays
        ),
        startDate: startDate,
        endDate: endDate,
      },
    });
  };

  const _manageWishlist = async (isWishListed: boolean) => {
    if (isWishListed === false) {
      const response = await postRequest<{}>("/manage-wishlists/add", {
        userId: userId,
        listingId: parkingSpotDetails?.parkingSpot._id,
      });
      if (response.data) {
        toast("Successfully updated wishlist");
      }
    } else {
      const response = await postRequest<{}>("/manage-wishlists/delete", {
        userId: userId,
        listingId: parkingSpotDetails?.parkingSpot._id,
      });
      if (response.data) {
        toast("Successfully updated wishlist");
      }
    }
    const result = await _fetchListing();
    setParkingSpotDetails(result.data.data);
  };

  return (
    <>
      <div className='flex flex-col flex-1'>
        {parkingSpotDetails ? (
          <div className='flex-1 flex flex-col'>
            <div className='flex flex-col md:flex-row w-full justify-between items-center md:px-4 py-2  bg-footer'>
              <h3 className='flex-1 lg:flex-[2] text-textSecondary'>
                {parkingSpotDetails.parkingSpot.name}
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
                {token ? (
                  <h5
                    className='flex flex-row items-center justify-center cursor-pointer text-textSecondary'
                    onClick={async () => {
                      await _manageWishlist(parkingSpotDetails.isWishListed);
                    }}
                  >
                    <span className='mr-1'>
                      <FaHeart
                        fill={parkingSpotDetails.isWishListed ? "red" : "white"}
                      />
                    </span>
                    {parkingSpotDetails.isWishListed ? "Remove" : "Save"}
                  </h5>
                ) : null}
              </div>
            </div>
            <div
              className='w-full flex flex-row items-center justify-center'
              style={{
                background: `url(data:image/png;base64,${parkingSpotDetails.parkingSpot.image.data})`,
                backgroundSize: "contain",
              }}
            >
              <div
                className='w-full flex flex-row items-center justify-center'
                style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
              >
                <img
                  src={`data:image/png;base64,${parkingSpotDetails.parkingSpot.image.data}`}
                  className='h-[400px] object-contain'
                  loading='lazy'
                  alt={parkingSpotDetails.parkingSpot.name}
                />
              </div>
            </div>
            <div className='flex flex-col md:flex-row m-4' id='details'>
              <div className='flex-1 md:border-r-[2px] md:border-borderColor md:mr-2 animate__animated  animate__slideInLeft'>
                <div className='flex flex-col mb-8 md:mb-0 md:mr-8 z-10 shadow-lg bg-backgroundColor flex-auto rounded-md '>
                  <div className='flex flex-col p-4'>
                    <h4 className='text-textPrimary'>Spot details</h4>
                    <p className='text-textPrimary'>
                      Name : {parkingSpotDetails.parkingSpot.name}
                    </p>
                    <p className='text-textPrimary'>
                      Description : {parkingSpotDetails.parkingSpot.description}
                    </p>
                    <p className='text-textPrimary'>
                      Parking Type :{" "}
                      {parkingSpotDetails.parkingSpot.parkingType}
                    </p>
                    <p className='text-textPrimary'>Timing : Whole day</p>
                    <p className='text-textPrimary'>
                      Owner :{" "}
                      {(parkingSpotDetails.parkingSpot.owner?.firstName || "") +
                        " " +
                        (parkingSpotDetails.parkingSpot.owner?.lastName || "")}
                    </p>
                    <div className='flex flex-row items-center'>
                      <p className='text-textPrimary mt-1'>
                        {parkingSpotDetails.reviewAverage}
                      </p>
                      <div className='ml-2'>
                        <StarRatings
                          rating={parkingSpotDetails.reviewAverage}
                          numberOfStars={5}
                          starDimension='20px'
                          starRatedColor='#0a0944'
                        />
                      </div>
                    </div>
                    <Link
                      to={
                        "/listings/" +
                        parkingSpotDetails.parkingSpot._id +
                        "/reviews"
                      }
                    >
                      <p className='underline cursor-pointer text-textPrimary'>
                        {parkingSpotDetails.totalReviews} Reviews
                      </p>
                    </Link>
                  </div>
                  <hr className='bg-borderColor m-0 opacity-100' />
                  <div className='flex flex-col p-4'>
                    <h4 className='text-textPrimary'>Spot Address</h4>
                    <p className='text-textPrimary'>
                      {parkingSpotDetails.parkingSpot.streetAddress}
                    </p>
                    <p className='text-textPrimary'>
                      {parkingSpotDetails.parkingSpot.city}
                    </p>
                    <p className='text-textPrimary'>
                      {parkingSpotDetails.parkingSpot.postalCode}{" "}
                      {parkingSpotDetails.parkingSpot.country}
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex-1 flex-grow animate__animated  animate__slideInRight'>
                <div className='flex flex-col h-full md:ml-4 z-10 shadow-lg bg-backgroundColor rounded-md'>
                  <div className='flex flex-col flex-1 px-4 pt-4 pb-3 w-full'>
                    <h4 className='text-textPrimary text-lg font-semibold'>
                      ${parkingSpotDetails.parkingSpot.dailyRate}/day
                    </h4>
                    <div className='flex flex-row w-full mt-2'>
                      <div className='flex flex-col flex-1 pr-6'>
                        <h6 className='text-textPrimary'>Start</h6>
                        <input
                          type='date'
                          className='bg-borderColor text-textSecondary mt-2 px-2 py-2 z-20 shadow-md rounded-md cursor-pointer'
                          min={new Date().toISOString().split("T")[0]}
                          value={startDate?.toISOString().split("T")[0]}
                          onChange={(e) => {
                            setStartDate(e.target.valueAsDate || undefined);
                          }}
                        />
                      </div>
                      <div className='flex flex-col flex-1'>
                        <h6 className='text-textPrimary'>End</h6>
                        <input
                          type='date'
                          className='bg-borderColor text-textSecondary px-2 py-2 mt-2 z-20 shadow-md rounded-md cursor-pointer'
                          min={new Date().toISOString().split("T")[0]}
                          value={endDate?.toISOString().split("T")[0]}
                          onChange={(e) => {
                            setEndDate(e.target.valueAsDate || undefined);
                          }}
                        />
                      </div>
                    </div>
                    <h4 className='text-red-400 text-sm font-semibold mt-1'>
                      {dayjs(endDate).diff(dayjs(startDate), "day") <= 0 &&
                      !dayjs(endDate).isSame(dayjs(startDate), "day")
                        ? "* End date needs to be greater than Start date"
                        : "* Select start date and end date for your booking. Please see the availabilities below to fix your spot in available dates."}
                    </h4>
                    <button
                      className='w-full text-center py-3 mt-4 bg-header text-textSecondary rounded-lg z-20 shadow-md'
                      onClick={() => {
                        _validateDetails();
                      }}
                    >
                      Proceed to booking
                    </button>
                  </div>
                  <div className='flex flex-row w-full px-4 py-2 justify-between'>
                    <h5 className='text-textPrimary'>
                      Sub total : ${parkingSpotDetails.parkingSpot.dailyRate} *{" "}
                      {dayjs(endDate).isSame(dayjs(startDate), "day")
                        ? 1
                        : dayjs(endDate).diff(dayjs(startDate), "day") < 0
                        ? 0
                        : dayjs(endDate).diff(dayjs(startDate), "day") + 1}
                    </h5>
                    <h5 className='text-textPrimary'>
                      ${" "}
                      {formatToTwoPrecisionFloat(
                        parkingSpotDetails.parkingSpot.dailyRate *
                          (dayjs(endDate).isSame(dayjs(startDate), "day")
                            ? 1
                            : dayjs(endDate).diff(dayjs(startDate), "day") < 0
                            ? 0
                            : dayjs(endDate).diff(dayjs(startDate), "day") + 1)
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
                        parkingSpotDetails.parkingSpot.dailyRate *
                          (dayjs(endDate).isSame(dayjs(startDate), "day")
                            ? 1
                            : dayjs(endDate).diff(dayjs(startDate), "day") < 0
                            ? 0
                            : dayjs(endDate).diff(dayjs(startDate), "day") + 1)
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
                  tileDisabled={(date) => {
                    let isDisabled = false;
                    parkingSpotDetails?.existingBookings?.forEach((item) => {
                      const startDate = dayjs(item.startDate);
                      const endDate = dayjs(item.endDate);

                      const currentDate = dayjs(date.date);

                      if (
                        currentDate.isSame(startDate, "date") ||
                        currentDate.isSame(endDate, "date") ||
                        (currentDate.isAfter(startDate, "date") &&
                          currentDate.isBefore(endDate, "date"))
                      ) {
                        isDisabled = true;
                        return;
                      }
                    });

                    return isDisabled;
                  }}
                />
              </div>
              <div className='block md:hidden'>
                <Calendar
                  showDoubleView={false}
                  className='border-0 z-50 shadow-lg rounded-md !bg-backgroundColor text-textPrimary'
                  tileDisabled={(date) => {
                    let isDisabled = false;
                    parkingSpotDetails?.existingBookings?.forEach((item) => {
                      const startDate = dayjs(item.startDate);
                      const endDate = dayjs(item.endDate);
                      const currentDate = dayjs(date.date);
                      if (
                        currentDate.isSame(startDate, "date") ||
                        currentDate.isSame(endDate, "date") ||
                        (currentDate.isAfter(startDate, "date") &&
                          currentDate.isBefore(endDate, "date"))
                      ) {
                        isDisabled = true;
                        return;
                      }
                    });

                    return isDisabled;
                  }}
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
                      parkingSpotDetails.parkingSpot.location.coordinates[0],
                      parkingSpotDetails.parkingSpot.location.coordinates[1]
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
                        parkingSpotDetails.parkingSpot.location.coordinates[0],
                        parkingSpotDetails.parkingSpot.location.coordinates[1]
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
                        {parkingSpotDetails.parkingSpot.streetAddress}
                      </p>
                      <p className='text-textPrimary'>
                        {parkingSpotDetails.parkingSpot.city}
                      </p>
                      <p className='text-textPrimary'>
                        {parkingSpotDetails.parkingSpot.postalCode}
                      </p>
                      <p className='text-textPrimary'>
                        {parkingSpotDetails.parkingSpot.country}
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
