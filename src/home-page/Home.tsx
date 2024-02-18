import Form from "react-bootstrap/Form";
import { TbFilter } from "react-icons/tb";
import { useEffect, useState } from "react";
import { HomeFilter } from "./HomeFilter";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";
import { getRequest } from "../utils/network-manager/axios";
import { calculateDistanceFromLatLon } from "../utils/map-utils";
import { Address } from "../spot-details/SpotDetails";

export interface ParkingSpotsResponse {
  parkingSpots: ParkingSpot[];
}

export interface ParkingSpot {
  id: number;
  parkingType: string;
  pricePerMonth: number;
  imageUrl: string;
  owner: Owner;
  location: Location;
  address: Address;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Owner {
  firstName: string;
  lastName: string;
}

function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);
  const [filteredParkingSpots, setFilteredParkingSpots] = useState<
    ParkingSpot[]
  >([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getRequest<ParkingSpotsResponse>("parking-spots").then((data) => {
      setParkingSpots(data.parkingSpots);
      setFilteredParkingSpots(data.parkingSpots);
    });
  }, []);

  const _renderSpotCard = (parkingSpot: ParkingSpot, index: number) => {
    return (
      <Link className='text-textPrimary' to={"/spot/" + parkingSpot.id}>
        <div
          className='aspect-square relative rounded-md shadow-lg h-[280px] md:h-[240px] xl:h-[280px] cursor-pointer hover:scale-[1.05] transition'
          key={index}
        >
          <img
            src={`https://picsum.photos/id/${parkingSpot.id}/200`}
            alt={parkingSpot.id.toString()}
            className='h-full w-full rounded-md'
            loading='lazy'
          ></img>
          <div className='w-full absolute bottom-0 flex flex-row p-2 items-center justify-between rounded-b-md bg-backgroundColor'>
            <div>
              <p className='m-0 p-0'>Parking Type: {parkingSpot.parkingType}</p>
              <p className='m-0 p-0'>
                Owner:{" "}
                {parkingSpot.owner.firstName + " " + parkingSpot.owner.lastName}
              </p>
            </div>
            <p className='m-0 p-0'>$ {parkingSpot.pricePerMonth}</p>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <>
      <div className='flex flex-col h-screen'>
        <Header />
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
                        item.address.addressLine1
                          .toLocaleLowerCase()
                          .includes(tempText) ||
                        item.address.addressLine2
                          .toLocaleLowerCase()
                          .includes(tempText) ||
                        item.address.city
                          .toLocaleLowerCase()
                          .includes(tempText) ||
                        item.address.state
                          .toLocaleLowerCase()
                          .includes(tempText) ||
                        item.address.postalCode
                          .toLocaleLowerCase()
                          .includes(tempText)
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
        <Footer />
      </div>
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
                item.pricePerMonth <= filtersFields.priceRange &&
                calculateDistanceFromLatLon(
                  item.location.latitude,
                  item.location.longitude,
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
    </>
  );
}

export default Home;
