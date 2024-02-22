import "./App.css";
import Home from "./home-page/Home";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { SpotDetails } from "./spot-details/SpotDetails";
import "react-calendar/dist/Calendar.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import CreateListing from "./create-listing/CreateListing";
import { SuccessMessage } from "./components/SuccessMessage";
import { Wallet } from "./wallet/Wallet";
import { Reviews } from "./ratings-and-reviews/Reviews";
import { ContactUs } from "./contact-us/ContactUs";
function App() {
  return (
    <>
      <Router>
        <div className='flex flex-col min-h-screen'>
          <Header />
          <div className='flex-grow'>
            <Routes>
              <Route path='/spot/:id' Component={SpotDetails}></Route>
              <Route path='/create-listing' Component={CreateListing}></Route>
              <Route path='/wallet' Component={Wallet}></Route>
              <Route path='/success' Component={SuccessMessage}></Route>
              <Route path='/reviews' Component={Reviews}></Route>
              <Route path='/contactus' Component={ContactUs}></Route>
              <Route path='/' Component={Home}></Route>
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
