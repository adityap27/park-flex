import "./App.css";
import Home from "./home-page/Home";
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
import ManageListings from "./manage-listings/ManageListings";
import EditListing from "./edit-listing/EditListing";
import ViewListing from "./view-listing/ViewListing";
function App() {
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
              <Route path='/create-listing' Component={CreateListing}></Route>
              <Route path='/manage-listings' Component={ManageListings}></Route>
              <Route path='/edit-listing' Component={EditListing}></Route>
              <Route path='/view-listing' Component={ViewListing}></Route>
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
