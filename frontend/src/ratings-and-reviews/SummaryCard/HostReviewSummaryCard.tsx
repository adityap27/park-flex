/*
  Author: Aditya Purohit
*/
import StarRatings from "react-star-ratings";
import { User } from "../ReviewCard";

interface Owner extends User {
  totalReviews: number;
  avgRating: number;
}

// This Component display the reviews summary of the parking spot host/owner.
export function HostReviewSummaryCard(ownerDetails: Owner) {
  return (
    <div className="shadow bg-white rounded-xl m-4 overflow-hidden">
      <div className="flex items-center justify-center">
        <img
          className="w-20 h-20 m-4 rounded-full object-cover ring-2"
          // use default profile picture if not present.
          src={
            ownerDetails.profilePic
              ? require(`../../assets/images/${ownerDetails.profilePic}`)
              : require(`../../assets/images/default-owner-pic.png`)
          }
          alt="Spot Owner Image"
        />
        <div className="font-medium">
          <p>
            {ownerDetails.firstName} {ownerDetails.lastName}{" "}
            <span className="block text-sm text-gray-500">Owner</span>
          </p>
        </div>
      </div>
      <hr className="mt-2"></hr>
      <div className="grid grid-cols-2 divide-x text-center">
        <div className="p-2">
          <p className="font-semibold">{ownerDetails?.totalReviews || 0} </p>
          <p>Reviews</p>
        </div>
        <div className="p-2">
          <div className="flex flex-row justify-center">
            <div className="font-semibold mt-0.5">
              {ownerDetails?.avgRating || 0}
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
