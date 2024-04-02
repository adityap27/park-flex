/**
 *  Author: Aditya Purohit
 */
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";

export function AddReviewModal({ onReviewAdded }: { onReviewAdded: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { listingId } = useParams();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleRatingChange = (newRating: any) => {
    setRating(newRating);
  };

  const handleReviewChange = (event: any) => {
    setReview(event.target.value);
  };

  // Form submission handler
  const handleSubmit = (event: any) => {
    event.preventDefault();

    // Validate rating field
    if (rating === 0) {
      return toast.error("Rating is mandatory");
    } else if (!(rating >= 1 && rating <= 5)) {
      return toast.error("Rating should be between 1 to 5");
    }

    // Validate review field
    if (review.length < 5) {
      return toast.error("Review should atleast contain 5 characters.");
    }

    // Send the review to backend
    setIsLoading(true);
    axios
      .post(
        `/listings/${listingId}/review`,
        {
          rating: rating,
          description: review,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message);
        setIsModalOpen(false);
        onReviewAdded(); // Re-render reviews to show new review.
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.error ||
            error.response?.data ||
            "Something went wrong."
        );
      })
      .finally(() => {
        // Reset loading state
        setIsLoading(false);
      });
  };

  return (
    <>
      {/* Button to open the modal */}
      <button
        className="disabled:bg-gray-600 disabled:cursor-not-allowed bg-header text-white enabled:hover:bg-white enabled:hover:text-header enabled:hover:border-header border font-semibold ml-2 mt-4 p-2 rounded-md"
        onClick={toggleModal}
        disabled={!localStorage.getItem('token')}
      >
        + Add Review
      </button>
      {/* Information for users */}
      <p className="text-black ml-4 p-2 rounded-md max-w-sm">
        Note: { localStorage.getItem('token') ? "To add your own review, you need a previous booking with this parking spot." : "Please login to add review." }
      </p>
      {/* Modal with a Form*/}
      {isModalOpen && (
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Add Review
                </h3>
                {/* Button to close the modal */}
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  onClick={toggleModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4">
                {/* Review Form */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Rating
                    </label>
                    <StarRatings
                      rating={rating}
                      starRatedColor="rgb(250, 175, 0)"
                      numberOfStars={5}
                      changeRating={handleRatingChange}
                      name="rating"
                      starDimension="24px"
                      starSpacing="2px"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Review
                    </label>
                    <textarea
                      value={review}
                      onChange={handleReviewChange}
                      className="resize-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      rows={4}
                      placeholder="Write your review here..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full disabled:bg-gray-600 disabled:cursor-not-allowed bg-header text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
