import StarRatings from "react-star-ratings";
import ownerImg from "../../assets/images/old-men-profile.jpg";

// This Component display the reviews summary of the parking spot host.
export function HostReviewSummaryCard() {
  return (
    <div className="shadow bg-white rounded-xl m-4 overflow-hidden">
      <div className="flex items-center justify-center">
        <img
          className="w-20 h-20 m-4 rounded-full object-cover ring-2"
          src={ownerImg}
          alt="Spot Owner Image-Jese Leos" />
        <div className="font-medium">
          <p>
            Jese Leos <span className="block text-sm text-gray-500">Owner</span>
          </p>
        </div>
      </div>
      <hr className="mt-2"></hr>
      <div className="grid grid-cols-2 divide-x text-center">
        <div className="p-2">
          <p className="font-semibold">45 </p>
          <p>Reviews</p>
        </div>
        <div className="p-2">
          <div className="flex flex-row justify-center">
            <div className="font-semibold mt-0.5">4.3</div>
            <div className="ml-1">
              <StarRatings
                rating={1}
                starRatedColor="rgb(250, 175, 0)"
                numberOfStars={1}
                name="rating"
                starDimension="20px"
                starSpacing="2px" />
            </div>
          </div>
          <div>Avg. ratings</div>
        </div>
      </div>
    </div>
  );
}
