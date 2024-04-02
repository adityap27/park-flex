/**
 * Author : Ketul Patel
 * This page shows all wish listed items which user has saved.
 */
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getRequest, postRequest } from "../utils/network-manager/axios";
import { ParkingSpot, ParkingSpotsResponse } from "../home-page/Home";
import { FaHeart } from "react-icons/fa";

export const Wishlist = () => {
  const userId = localStorage.getItem("userId");
  const [wishlist, setWishlist] = useState<ParkingSpot[] | undefined>(
    undefined
  );

  const _fetchWishlist = useCallback(() => {
    return getRequest<ParkingSpotsResponse>(
      "manage-wishlists/get-all?userId=" + userId
    );
  }, [userId]);

  useEffect(() => {
    toast.promise(_fetchWishlist(), {
      pending: "Loading Wishlist",
      success: {
        render(data) {
          setWishlist(data.data.data.data);
          return "Successfully fetched details";
        },
      },
      error: "System not able to fetch details",
    });
  }, [_fetchWishlist, userId]);

  const _manageWishlist = async (id: string) => {
    const response = await postRequest<{}>("/manage-wishlists/delete", {
      userId: userId,
      listingId: id,
    });
    if (response.data) {
      toast("Successfully updated wishlist");
    }
    const result = await _fetchWishlist();
    setWishlist(result.data.data);
  };

  const _renderSpotCard = (parkingSpot: ParkingSpot, index: number) => {
    return (
      <div
        className='aspect-square relative rounded-md shadow-lg h-[280px] md:h-[240px] xl:h-[280px] cursor-pointer hover:scale-[1.05] transition'
        key={index}
      >
        <Link className='text-textPrimary' to={"/spot/" + parkingSpot._id}>
          <img
            src={`data:image/png;base64,${parkingSpot.image.data}`}
            alt={parkingSpot.name.toString()}
            className='h-full w-full rounded-md'
            loading='lazy'
          ></img>
        </Link>

        <div className='w-full absolute bottom-0 flex flex-row p-2 items-center justify-between rounded-b-md bg-backgroundColor'>
          <div className='flex-1'>
            <p className='m-0 p-0 truncate w-full'>{parkingSpot.name}</p>
            <p className='m-0 p-0'>Type: {parkingSpot.parkingType}</p>
          </div>
          <FaHeart
            fill='red'
            size={32}
            onClick={async (e) => {
              e.preventDefault();
              await _manageWishlist(parkingSpot._id);
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      {wishlist && (
        <div className='px-8 py-8 flex-1'>
          <div className='flex flex-col items-center justify-center'>
            <div className='pt-8'>
              {wishlist?.length > 0 ? (
                <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                  {wishlist.map((parkingSpot, index) =>
                    _renderSpotCard(parkingSpot, index)
                  )}
                </div>
              ) : (
                <div className='flex justify-center items-center mt-10 mb-10'>
                  <p className='text-xl md:text-2xl lg:text-3xl'>
                    No wishlisted parking spots found
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
