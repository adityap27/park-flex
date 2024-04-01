import "./App.css";
import Home from "./home-page/Home";
import LoginPage from "./Auth/LoginPage";
import RegistrationPage from "./Auth/Registration";
import ForgetPasswordPage from "./Auth/ForgetPasswordPage";
import ResetPasswordPage from "./Auth/ResetPasswordPage";
import ProfilePage from "./Auth/ProfilePage";
//import useAuthStore from "./stores/useAuthStore";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ContactUs } from "./contact-us/ContactUs";
import { FAQPage } from "./frequently-asked-questions/Faq";
import LandingPage from "./landing-page/LandingPage";
import CreateListing from "./create-listing/CreateListing";
import EditListing from "./edit-listing/EditListing";
import ViewListing from "./view-listing/ViewListing";
import ManageListings from "./manage-listings/ManageListings";
import { SpotDetails } from "./spot-details/SpotDetails";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import ManangeBookings from "./manage-bookings/ManageBookings";
import ViewDetails from "./manage-bookings/ViewDetails";

import Wallet from "./wallet/Wallet";
import TransactionHistory from "./Transactions/Transactions";
import ConfirmBooking from "./manage-bookings/ConfirmBooking";
import { ReviewsPage } from "./ratings-and-reviews/ReviewsPage";
import { Wishlist } from "./wishlist/Wishlist";
import { useEffect } from "react";
import axios from "axios";
function App() {
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
  }, [token]);

  return (
    <>
      <Router>
        <div className='flex flex-col min-h-screen'>
          <Header />
          <div className='flex-grow'>
            <Routes>
              <Route path='/faq' Component={FAQPage}></Route>
              <Route path='/contact-us' Component={ContactUs}></Route>
              <Route path='/' Component={LandingPage}></Route>
              <Route path='/home' Component={Home}></Route>
              <Route path='/login' Component={LoginPage}></Route>
              <Route path='/register' Component={RegistrationPage}></Route>
              <Route path='/listings/:listingId/reviews' Component={ReviewsPage}></Route>
              <Route
                path='/forgetpassword'
                Component={ForgetPasswordPage}
              ></Route>
              <Route
                path='/resetpassword/:token'
                Component={ResetPasswordPage}
              ></Route>
              <Route
                path='/profile'
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path='/create-listing'
                element={
                  <ProtectedRoute>
                    <CreateListing />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path='/manage-listings'
                element={
                  <ProtectedRoute>
                    <ManageListings />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path='/edit-listing'
                element={
                  <ProtectedRoute>
                    <EditListing />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path='/viewdetails'
                element={
                  <ProtectedRoute>
                    <ViewDetails />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path='/confirmbooking'
                element={
                  <ProtectedRoute>
                    <ConfirmBooking />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path='/manage-bookings'
                element={
                  <ProtectedRoute>
                    <ManangeBookings />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path='/view-listing'
                element={
                  <ProtectedRoute>
                    <ViewListing />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path='/wish-list'
                element={
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path='/spot/:id' Component={SpotDetails}></Route>
              <Route
                path='/wallet'
                element={
                  <ProtectedRoute>
                    <Wallet />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path='/transaction-history'
                element={
                  <ProtectedRoute>
                    <TransactionHistory />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path='*'
                Component={() => (
                  <div className='w-full h-screen flex flex-row items-center justify-center'>
                    <h1>Page not found</h1>
                  </div>
                )}
              ></Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
      <ToastContainer position='top-right' />
    </>
  );
}

export default App;
