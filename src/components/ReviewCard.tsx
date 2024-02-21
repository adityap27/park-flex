import StarRatings from "react-star-ratings";

/**
 * Represents a user review with user details and review meta-data.
 */
export interface Review {
  id: number;
  user: {
    name: string;
    profilePic: string;
  };
  date: string;
  bookingPeriod: string;
  stars: number;
  text: string;
}


// This component displays a card with user details and their review.
export function ReviewCard(review: Review) {
  return (
    <div className="block max-w-4xl m-3 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 ">
      <div className="flex items-center mb-4">
        <img
          className="w-10 h-10 me-4 rounded-full object-cover ring-2"
          src={require(`../assets/images/${review.user.profilePic}`)}
          alt=""
        />
        <div className="font-medium">
          <p>
            {review.user.name + " "}
            <span className="block text-sm text-gray-500">
              Booked this spot for {review.bookingPeriod}
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
        <StarRatings
          rating={review.stars}
          starRatedColor="rgb(250, 175, 0)"
          numberOfStars={5}
          name="rating"
          starDimension="24px"
          starSpacing="2px"
        />
      </div>
      <footer className="mb-5 text-sm text-gray-500">
        <p>
          Reviewed on {review.date}
        </p>
      </footer>
      <p className="mb-2 text-gray-500 ">{review.text}</p>
    </div>
  );
}/**
 * Represents a user review with user details and review meta-data.
 */
export interface Review {
  id: number;
  user: {
    name: string;
    profilePic: string;
  };
  date: string;
  bookingPeriod: string;
  stars: number;
  text: string;
}

