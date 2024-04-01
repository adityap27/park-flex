/*
  Author: Aditya Purohit
*/

import { SpotReviewSummaryCard } from "./SummaryCard/SpotReviewSummaryCard";
import { HostReviewSummaryCard } from "./SummaryCard/HostReviewSummaryCard";
import { ReviewCard } from "./ReviewCard";
import { Review } from "./ReviewCard";
import { AddReviewModal } from "./AddReviewModal";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// This component displays list of review cards with sort and filter dropdowns.
export function ReviewsPage() {
  const [reviewsData, setReviewsData] = useState<any>(null);
  const { listingId } = useParams();
  const [sortingKey, setSortingKey] = useState("recentFirst");
  const [filterKey, setFilterKey] = useState("all");
  const [loading, setLoading] = useState({ isLoading: true, success: false });

  useEffect(() => {
    getReviewsData();
  }, []);

  // Callback function to update reviews data
  const getReviewsData = () => {
    // Scroll to top of page when the page opens.
    window.scrollTo(0, 0);

    // Fetch all reviews from the backend.
    axios
      .get(`/listings/${listingId}/reviews`)
      .then((response) => {
        setReviewsData(response.data);
        setLoading({ isLoading: false, success: true });
      })
      .catch((error) => {
        toast.error(error.response?.data?.error || "Something went wrong.");
        setLoading({ isLoading: false, success: false });
      });
  };

  function sortReviews(reviews: Review[]) {
    switch (sortingKey) {
      case "oldestFirst":
        return reviews.sort(
          (a: Review, b: Review) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "highestFirst":
        return reviews.sort((a: Review, b: Review) => b.rating - a.rating);
      case "lowestFirst":
        return reviews.sort((a: Review, b: Review) => a.rating - b.rating);
      default:
        return reviews.sort(
          (a: Review, b: Review) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  }

  function filterReviews(reviews: Review[]) {
    if (filterKey === "all") {
      return reviews;
    } else {
      return reviews.filter((review) => review.rating.toString() === filterKey);
    }
  }

  // Function to render either reviews or an error message based on the conditions
  function showCardsOrError(reviews: any) {
    // Display an error message if no reviews exist for the parking spot
    if (reviews.length === 0) {
      return (
        <div className="block max-w-4xl m-3 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 text-center text-gray-500">
          <p>Sorry, no reviews exist for this parking spot yet.</p>
          <p>Please check again later.</p>
        </div>
      );
    }
    const sortedAndFilteredReviews = sortReviews(filterReviews(reviews));

    // Display an error message if no reviews match the current filter selection
    if (sortedAndFilteredReviews.length === 0) {
      return (
        <div className="block max-w-4xl m-3 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 text-center text-gray-500">
          <p>Sorry, no reviews match your current filter selection.</p>
          <p> Please try clearing or changing the filter.</p>
        </div>
      );
    }

    // Render the sorted and filtered reviews using ReviewCard component
    return sortedAndFilteredReviews.map((review) => (
      <ReviewCard key={review._id} {...review} />
    ));
  }

  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow bg-gray-100">
          {/* Display spinner if response is not received from backend. */}
          {loading.isLoading && (
            <div className="flex items-center justify-center h-screen">
              <div className="spinner-border text-header mr-2" /> Loading
              reviews...
            </div>
          )}
          {/* Display the review details only for successful response from backend. */}
          {!loading.isLoading && loading.success ? (
            <div className="grid md:grid-cols-4 bg-gray-100 justify-center">
              <div className="col-span-1 w-screen md:w-auto order-1 md:order-1">
                <div className="text-3xl font-bold my-7 mx-auto text-center text-header">
                  Reviews
                </div>
                {reviewsData?.listing && (
                  <SpotReviewSummaryCard {...reviewsData?.listing} />
                )}
                {reviewsData?.listing?.owner && (
                  <HostReviewSummaryCard {...reviewsData?.listing?.owner} />
                )}
              </div>
              <div className="col-span-1 md:col-span-2 order-3 md:order-2">
                <div className="flex gap-6 max-w-4xl m-4">
                  <div>
                    <label
                      htmlFor="sort-by"
                      className="block text-sm font-medium leading-6 text-gray-600"
                    >
                      Sort by:
                    </label>
                    <div>
                      <select
                        id="sort-by"
                        name="sort-by"
                        className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black sm:max-w-xs sm:text-sm sm:leading-6"
                        onChange={(event) => setSortingKey(event.target.value)}
                      >
                        <option value="recentFirst">Most Recent</option>
                        <option value="oldestFirst">Oldest First</option>
                        <option value="highestFirst">
                          Highest-rating First
                        </option>
                        <option value="lowestFirst">Lowest-rating First</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="filter-by"
                      className="block text-sm font-medium leading-6 text-gray-600"
                    >
                      Filter by:
                    </label>
                    <div>
                      <select
                        id="filter-by"
                        name="filter-by"
                        className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black sm:max-w-xs sm:text-sm sm:leading-6"
                        onChange={(event) => setFilterKey(event.target.value)}
                      >
                        <option value="all">All Stars</option>
                        <option value="5">5 Stars only</option>
                        <option value="4">4 Stars only</option>
                        <option value="3">3 Stars only</option>
                        <option value="2">2 Stars only</option>
                        <option value="1">1 Stars only</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  {reviewsData == null
                    ? ""
                    : showCardsOrError(reviewsData.reviews)}
                </div>
              </div>
              <div className="col-span-1 w-screen md:w-auto order-2 md:order-3">
                <AddReviewModal onReviewAdded={getReviewsData}/>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
