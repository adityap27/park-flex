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
          <p className='text-textSecondary'>Park Help</p>
        </Navbar.Brand>
        <Navbar.Toggle className='bg-white' />
        <Navbar.Collapse className='justify-content-end'>
          <Nav>
            <Link className='!text-textSecondary nav-link' to='/login'>
              Login
            </Link>
            <div className='border-l-2 border-solid border-borderColor mx-4 my-2 hidden lg:block'></div>
            <Link className='!text-textSecondary nav-link' to='/register'>
              Register
            </Link>
            <div className='border-l-2 border-solid border-borderColor mx-4 my-2 hidden lg:block'></div>
            <Link className='!text-textSecondary nav-link' to='/wallet'>
              Wallet
            </Link>
            <div className='border-l-2 border-solid border-borderColor mx-4 my-2 hidden lg:block'></div>
            <Link className='!text-textSecondary nav-link' to='/create-listing'>
              Create listing
            </Link>
            <div className='border-l-2 border-solid border-borderColor mx-4 my-2 hidden lg:block'></div>
            <Link className='!text-textSecondary nav-link' to='/rating'>
              Ratings
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};
