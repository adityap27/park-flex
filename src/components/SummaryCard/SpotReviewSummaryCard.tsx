import StarRatings from "react-star-ratings";
import spotImg from "../../assets/images/parking-spot.jpg";

// This Component display the reviews summary of the parking spot.
export function SpotReviewSummaryCard() {
  return (
    <div className="shadow bg-white rounded-xl m-4 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center">
        <img
          src={spotImg}
          className="max-w-36 max-h-22 rounded m-2 me-4 object-cover"
          alt="Parking Spot Image-Spot 106" />
        <div>
          <p>Spot 106,</p>
          <p>2080 Quingate Place,</p>
          <p>Halifax, NS, B3L 4R9.</p>
        </div>
      </div>
      <hr className="mt-2"></hr>
      <div className="grid grid-cols-2 divide-x text-center">
        <div className="p-2">
          <p className="font-semibold">2 </p>
          <p>Reviews</p>
        </div>
        <div className="p-2">
          <div className="flex flex-row justify-center">
            <div className="font-semibold mt-0.5">4.0</div>
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
