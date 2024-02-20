import "./App.css";
import Home from "./home-page/Home";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { SpotDetails } from "./spot-details/SpotDetails";
import "react-calendar/dist/Calendar.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";
import { CreateListing } from "./create-listing/CreateListing";
import { SuccessMessage } from "./components/SuccessMessage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/spot/:id' Component={SpotDetails}></Route>
          <Route path='/' Component={Home}></Route>
          <Route path='/create-listing' Component={CreateListing}></Route>
          <Route path='/success' Component={SuccessMessage}></Route>
        </Routes>
      </Router>
      <ToastContainer position='top-right' />
    </div>
  );
}

export default App;
