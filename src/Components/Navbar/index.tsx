import React, { useState } from 'react';
import { IoMenuOutline, IoClose } from "react-icons/io5";

const Navbar: React.FC = () => {
  const [navbar, setNavbar] = useState<boolean>(false);
  const handleNavbar = () => {setNavbar(!navbar);};

  const navbarItems = [
    { id: 1, name: 'Home' },
    { id: 2, name: 'Book Parking Spot' },
    { id: 3, name: 'My Listings' },
    { id: 4, name: 'Blogs' },
    { id: 5, name: 'Contact'},
    { id: 6, name: 'Profile' },
  ];

  return (
    <div className='text-white bg-black max-w-full mx-auto items-center flex justify-between h-20 px-5'>
      <h1 className='text-white text-3xl w-full font-bold'>ParkFlex</h1>
      <ul className='hidden md:flex'>
        {navbarItems.map(item => ( 
          <li
            key={item.id}
            className='cursor-pointer whitespace-nowrap rounded-md m-2 p-4 hover:bg-white hover:text-black duration-150'
          >
            {item.name}
          </li>
        ))}
      </ul>
      <div onClick={handleNavbar} className='block md:hidden'>
        {navbar ? <IoClose size={20} /> : <IoMenuOutline size={20} />}
      </div>
    </div>
  );
};

export default Navbar;