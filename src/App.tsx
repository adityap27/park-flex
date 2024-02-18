import "./App.css";
import Home from "./home-page/Home";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { SpotDetails } from "./spot-details/SpotDetails";
import "react-calendar/dist/Calendar.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/spot/:id' Component={SpotDetails}></Route>
          <Route path='/' Component={Home}></Route>
        </Routes>
      </Router>
      <ToastContainer position='top-right' />
    </div>
  );
}

export default App;
