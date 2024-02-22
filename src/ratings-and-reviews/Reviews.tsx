import reviewsData from "../review-dummy-data.json";
import { SpotReviewSummaryCard } from "../components/SummaryCard/SpotReviewSummaryCard";
import { HostReviewSummaryCard } from "../components/SummaryCard/HostReviewSummaryCard";
import { ReviewCard } from "../components/ReviewCard";
import { Review } from "../components/ReviewCard";
import { useState } from "react";

// This component displays list of review cards with sort and filter dropdowns.
export function Reviews() {
  const [sortingKey, setSortingKey] = useState("recentFirst");
  const [filterKey, setFilterKey] = useState("all");

  function sortReviews(reviews: Review[]) {
    switch (sortingKey) {
      case "oldestFirst":
        return reviews.sort(
          (a: Review, b: Review) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      case "highestFirst":
        return reviews.sort((a: Review, b: Review) => b.stars - a.stars);
      case "lowestFirst":
        return reviews.sort((a: Review, b: Review) => a.stars - b.stars);
      default:
        return reviews.sort(
          (a: Review, b: Review) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }
  }

  function filterReviews(reviews: Review[]) {
    if (filterKey === "all") {
      return reviews;
    } else {
      return reviews.filter((review) => review.stars.toString() === filterKey);
    }
  }

  // Function to render either reviews or an error message based on the conditions
  function showCardsOrError(reviews: Review[]) {
    // Display an error message if no reviews exist for the parking spot
    if (reviews.length === 0) {
      return (
        <div className="block max-w-4xl m-3 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 text-center text-gray-500">
          <p>Sorry, no reviews exist for this parking spot yet.</p>
          <p>Please check again later.</p>
        </div>
      );
    }
    const sortedAndFilteredReviews = sortReviews(
      filterReviews(reviewsData.reviews)
    );

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
      <ReviewCard key={review.id} {...review} />
    ));
  }

  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow bg-gray-100">
          <div className="grid md:grid-cols-4 bg-gray-100 justify-center">
      <div className="col-span-1 w-screen md:w-auto order-1 md:order-1">
        <div className="text-3xl font-bold my-7 mx-auto text-center text-sky-900">
          Reviews
        </div>
        <SpotReviewSummaryCard />
        <HostReviewSummaryCard />
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
                <option value="highestFirst">Highest-rating First</option>
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
        <div>{showCardsOrError(reviewsData.reviews)}</div>
      </div>
      <div className="col-span-1 w-screen md:w-auto order-2 md:order-3">
        <button className="cursor-not-allowed bg-gray-500 text-white ml-4 mt-4 p-2 rounded-md">
          + Add Review
        </button>
        <p className="text-black ml-4 p-2 rounded-md max-w-sm">
          To add your own review, you need a previous booking with this parking
          spot.
        </p>
      </div>
    </div>
        </div>
      </div>
    </div>
  );
}
