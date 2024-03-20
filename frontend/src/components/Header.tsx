import { Navbar } from "react-bootstrap";
import { FaCar } from "react-icons/fa";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className='sticky w-full top-0 z-50 bg-header shadow-xl border-b-1 border-borderColor'>
      <Navbar expand='md' className='py-2 px-4'>
        <Navbar.Brand
          href='/'
          className='flex-row flex items-center text-textSecondary'
        >
          <FaCar className='mr-2 text-3xl text-textSecondary' />
          <p className='text-textSecondary'>ParkFlex</p>
        </Navbar.Brand>
        <Navbar.Toggle className='bg-white' />
        <Navbar.Collapse className='justify-content-end'>
          <Nav>
            <div className='!text-textSecondary nav-link cursor-pointer'>
              Login
            </div>
            <div className='border-l-2 border-solid border-borderColor mx-4 my-2 hidden lg:block'></div>
            <div className='!text-textSecondary nav-link cursor-pointer'>
              Register
            </div>
            <div className='border-l-2 border-solid border-borderColor mx-4 my-2 hidden lg:block'></div>
            <Link to='/manage-listings'>
              <p className='text-textSecondary cursor-pointer pt-2'>My Listings</p>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};
