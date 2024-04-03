/**
 * Author : Ketul Patel
 */
import { Navbar } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import { useState } from "react";
import { FaSquareParking } from "react-icons/fa6";

export const Header = () => {
  const { token, setToken } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className='sticky w-full top-0 z-50 bg-header shadow-xl border-b-1 border-borderColor'>
      <Navbar className='py-2 px-4'>
        <Navbar.Brand
          as={Link}
          to='/'
          className='flex-row flex items-center text-textSecondary'
        >
          <FaSquareParking className='text-3xl text-textSecondary' />
          <p className='text-textSecondary'>arkFlex</p>
        </Navbar.Brand>
        <Navbar.Collapse className='justify-content-end items-center'>
          <Nav>
            {token === null ? (
              <>
                <Link to='/login'>
                  <div className='!text-textSecondary nav-link cursor-pointer'>
                    Login
                  </div>
                </Link>
                <div className='border-l-2 border-solid border-borderColor mx-4 my-2 hidden lg:block'></div>
              </>
            ) : null}
            {token === null ? (
              <>
                <Link to='/register'>
                  <div className='!text-textSecondary nav-link cursor-pointer'>
                    Register
                  </div>
                </Link>
              </>
            ) : null}

            {token ? (
              <>
                <div className='relative'>
                  <div
                    className='cursor-pointer bg-slate-500 text-center flex flex-row items-center justify-center p-4 rounded-full'
                    onClick={handleDropdownToggle}
                  >
                    <FaUser fill='white' />
                  </div>
                  {showDropdown && (
                    <>
                      <div className='absolute right-0 mt-2 w-48 z-50 bg-white rounded-md overflow-hidden shadow-xl z-10'>
                        <Link
                          to='/profile'
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                          onClick={() => {
                            setShowDropdown(false);
                          }}
                        >
                          My Profile
                        </Link>
                        <Link
                          to='/manage-listings'
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                          onClick={() => {
                            setShowDropdown(false);
                          }}
                        >
                          My Listings
                        </Link>
                        <Link
                          to='/manage-bookings'
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                          onClick={() => {
                            setShowDropdown(false);
                          }}
                        >
                          My Bookings
                        </Link>
                        <Link
                          to='/wish-list'
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                          onClick={() => {
                            setShowDropdown(false);
                          }}
                        >
                          My Wishlist
                        </Link>
                        <Link
                          to='/wallet'
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                          onClick={() => {
                            setShowDropdown(false);
                          }}
                        >
                          Wallet
                        </Link>
                        <Link
                          to='/transaction-history'
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                          onClick={() => {
                            setShowDropdown(false);
                          }}
                        >
                          Transactions
                        </Link>
                        <h1
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
                          onClick={() => {
                            setToken(null);
                          }}
                        >
                          Logout
                        </h1>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};
