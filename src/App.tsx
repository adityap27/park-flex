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

function App() {
  return (
    <>
      <div className='flex flex-col h-screen'>
        <Header />
        <div className='flex-1'>
          <Router>
            <Routes>
              <Route path='/spot/:id' Component={SpotDetails}></Route>
              <Route path='/' Component={Home}></Route>
            </Routes>
          </Router>
        </div>
        <Footer />
      </div>
      <ToastContainer position='top-right' />
    </>
  );
}

export default App;
