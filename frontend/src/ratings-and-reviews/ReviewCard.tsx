/*
  Author: Aditya Purohit
*/
import StarRatings from "react-star-ratings";

export interface Review {
  _id: string;
  rating: number;
  description: string;
  user: User;
  durationInDays: number;
  createdAt: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePic?: string;
}

// This component displays a card with user details and their review.
export function ReviewCard(review: Review) {
  return (
    <div className="block max-w-4xl m-3 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 ">
      <div className="flex items-center mb-4">
        <img
          className="w-10 h-10 me-4 rounded-full object-cover ring-2"
          src={
            review.user.profilePic
              ? require(`../assets/images/${review.user.profilePic}`)
              : require(`../assets/images/default-user-pic.png`)
          }
          alt=""
        />
        <div className="font-medium">
          <p>
            {`${review.user.firstName} ${review.user.lastName} `}
            <span className="block text-sm text-gray-500">
              Booked this spot for {review.durationInDays || 0} days
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
        <StarRatings
          rating={review.rating}
          starRatedColor="rgb(250, 175, 0)"
          numberOfStars={5}
          name="rating"
          starDimension="24px"
          starSpacing="2px"
        />
      </div>
      <footer className="mb-5 text-sm text-gray-500">
        <p>
          Reviewed on{" "}
          {new Date(review.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </footer>
      <p className="mb-2 text-gray-500 ">{review.description}</p>
    </div>
  );
}
