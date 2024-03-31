/*
  Author: Aditya Purohit
*/

import StarRatings from "react-star-ratings";
import { User } from "../ReviewCard";
import { Link } from "react-router-dom";

interface SpotDetails {
  _id: string;
  image: { data: string; contentType: string };
  owner: User;
  name: string;
  streetAddress: string;
  city: string;
  country: string;
  postalCode: string;
  avgRating: number;
  totalReviews: number;
}

// This Component display the reviews summary of the parking spot/listing.
export function SpotReviewSummaryCard(SpotDetails: SpotDetails) {
  return (
    <div className="shadow bg-white rounded-xl m-4 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center">
        <img
          src={`data:${SpotDetails.image.contentType};base64,${SpotDetails.image.data}`}
          className="max-w-36 max-h-22 rounded m-2 me-4 object-cover"
          alt="Parking Spot Image"
        />
        <div>
          <Link to={"/spot/" + SpotDetails._id}>
            <p className="underline cursor-pointer text-textPrimary">
              {SpotDetails.name},
            </p>
          </Link>
          <p>{SpotDetails.streetAddress},</p>
          <p>
            {SpotDetails.city}, {SpotDetails.country}, {SpotDetails.postalCode}.
          </p>
        </div>
      </div>
      <hr className="mt-2"></hr>
      <div className="grid grid-cols-2 divide-x text-center">
        <div className="p-2">
          <p className="font-semibold">{SpotDetails?.totalReviews || 0} </p>
          <p>Reviews</p>
        </div>
        <div className="p-2">
          <div className="flex flex-row justify-center">
            <div className="font-semibold mt-0.5">
              {SpotDetails?.avgRating || 0.0}{" "}
            </div>
            <div className="ml-1">
              <StarRatings
                rating={1}
                starRatedColor="rgb(250, 175, 0)"
                numberOfStars={1}
                name="rating"
                starDimension="20px"
                starSpacing="2px"
              />
            </div>
          </div>
          <div>Avg. ratings</div>
        </div>
      </div>
    </div>
  );
}
