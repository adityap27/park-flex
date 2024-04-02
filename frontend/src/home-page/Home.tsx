/**
 * Author : Ketul Patel
 * This page is used to list all parking spots and allow to filter those parking spots
 */
import Form from "react-bootstrap/Form";
import { TbFilter } from "react-icons/tb";
import { useEffect, useState } from "react";
import { HomeFilter } from "./HomeFilter";
import { getRequest } from "../utils/network-manager/axios";
import { calculateDistanceFromLatLon } from "../utils/map-utils";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export interface ParkingSpotsResponse {
  success: boolean;
  data: ParkingSpot[];
}

export interface ParkingSpot {
  _id: string;
  parkingType: "indoor" | "outdoor";
  dailyRate: number;
  image: {
    data: string;
    contentType: string;
  };
  owner?: Owner;
  location: Location;
  streetAddress: string;
  country: string;
  city: string;
  postalCode: string;
  name: string;
  description: string;
}

export interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Location {
  type: string;
  coordinates: [number, number];
}

export interface Owner {
  firstName: string;
  lastName: string;
  email: string;
}

function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[] | undefined>(
    undefined
  );
  const [filteredParkingSpots, setFilteredParkingSpots] = useState<
    ParkingSpot[]
  >([]);
  const [searchText, setSearchText] = useState("");

  const _getListings = async () => {
    const data = await toast.promise(
      getRequest<ParkingSpotsResponse>("parking-listings"),
      {
        pending: "Loading Parking Spots",
        success: "Successfully fetched details",
        error: "System not able to fetch details",
      }
    );
    return data;
  };
  useEffect(() => {
    const _init = async () => {
      const result = await _getListings();
      if (result.data) {
        setParkingSpots(result.data.data);
        setFilteredParkingSpots(result.data.data);
      }
    };

    _init();
  }, []);

  const _renderSpotCard = (parkingSpot: ParkingSpot, index: number) => {
    return (
      <Link className='text-textPrimary' to={"/spot/" + parkingSpot._id}>
        <div
          className='aspect-square relative rounded-md shadow-lg h-[280px] md:h-[240px] xl:h-[280px] cursor-pointer hover:scale-[1.05] transition'
          key={index}
        >
          <img
            src={`data:image/png;base64,${parkingSpot.image.data}`}
            alt={parkingSpot.name.toString()}
            className='h-full w-full rounded-md'
            loading='lazy'
          ></img>
          <div className='w-full absolute bottom-0 flex flex-row p-2 items-center justify-between rounded-b-md bg-backgroundColor'>
            <div className='flex-1'>
              <p className='m-0 p-0 truncate w-full'>{parkingSpot.name}</p>
              <p className='m-0 p-0'>Type: {parkingSpot.parkingType}</p>
            </div>
            <p className='m-0 p-0'>Daily: $ {parkingSpot.dailyRate}</p>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <>
      {parkingSpots && (
        <div className='px-8 py-8 flex-1'>
          <div className='flex flex-col items-center justify-center'>
            <div className='flex flex-row items-center h-[48px]'>
              <Form.Control
                placeholder='Search by address / pin code / city, Example: Main Street'
                className='h-[48px] sm:!w-full md:!w-[320px] lg:!w-[640px] !text-textPrimary placeholder:!text-textPrimary border-textPrimary border-[1px]'
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  const tempText = e.target.value.toLocaleLowerCase();
                  setFilteredParkingSpots(
                    parkingSpots.filter((item) => {
                      return (
                        tempText === "" ||
                        item.streetAddress
                          .toLocaleLowerCase()
                          .includes(tempText) ||
                        item.name.toLocaleLowerCase().includes(tempText) ||
                        item.city.toLocaleLowerCase().includes(tempText) ||
                        item.country.toLocaleLowerCase().includes(tempText) ||
                        item.postalCode.toLocaleLowerCase().includes(tempText)
                      );
                    })
                  );
                }}
              ></Form.Control>
              <TbFilter
                className='text-[48px] mx-2 text-textPrimary cursor-pointer'
                onClick={() => {
                  setIsFilterOpen(true);
                }}
              />
            </div>
            <div className='pt-8'>
              {filteredParkingSpots?.length > 0 ? (
                <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                  {filteredParkingSpots.map((parkingSpot, index) =>
                    _renderSpotCard(parkingSpot, index)
                  )}
                </div>
              ) : (
                <div className='text-center flex flex-row items-center justify-center h-full w-full'>
                  <h5 className='text-textPrimary'>
                    No parking spots available
                  </h5>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {parkingSpots && (
        <HomeFilter
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          clearCallback={() => {
            setFilteredParkingSpots(parkingSpots);
          }}
          applyCallback={(filtersFields) => {
            setFilteredParkingSpots(
              parkingSpots.filter((item) => {
                if (
                  item.parkingType === filtersFields.parkingType &&
                  item.dailyRate <= filtersFields.priceRange &&
                  calculateDistanceFromLatLon(
                    item.location.coordinates[0],
                    item.location.coordinates[1],
                    filtersFields.currentLocation.lat,
                    filtersFields.currentLocation.lng
                  ) <= filtersFields.radius
                ) {
                  return true;
                }
                return false;
              })
            );
          }}
        />
      )}
    </>
  );
}

export default Home;
