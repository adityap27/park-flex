/**
 * Author : Ketul Patel
 */
import { Link } from "react-router-dom";
import { FaSquareParking } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className='px-4 pb-2 pt-4 bg-footer'>
      <div className='flex flex-row'>
        <div className='flex flex-col flex-[2] md:flex-[3]'>
          <div className='flex flex-row items-center'>
            <FaSquareParking fill='white' />
            <p className='text-textSecondary'>arkFlex</p>
          </div>
          <p className='text-textSecondary'>&copy;2024</p>
        </div>
        <div className='flex flex-col lg:flex-row justify-between flex-[2] xl:flex-[1.5] mx-6 my-2'>
          <p className='text-textSecondary cursor-pointer hover:underline'>
            Privacy & Terms
          </p>
          <p className='text-textSecondary cursor-pointer hover:underline'>
            Support
          </p>
          <Link to='/faq'>
            <p className='text-textSecondary cursor-pointer hover:underline'>
              FAQ
            </p>
          </Link>
          <p className='text-textSecondary cursor-pointer hover:underline'>
            About
          </p>
          <Link to='/contact-us'>
            <p className='text-textSecondary cursor-pointer hover:underline'>
              Contact
            </p>
          </Link>
        </div>
      </div>
    </footer>
  );
};
