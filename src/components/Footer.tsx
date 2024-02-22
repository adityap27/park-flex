import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className='px-4 pb-2 pt-4 bg-footer'>
      <div className='flex flex-row'>
        <div className='flex flex-col flex-[2] md:flex-[3]'>
          <p className='text-textSecondary'>Park help</p>
          <p className='text-textSecondary'>&copy;2024</p>
        </div>
        <div className='flex flex-col lg:flex-row justify-between flex-1 mx-6'>
          <Link to='/privacy'>
            <p className='text-textSecondary cursor-pointer'>Privacy & Terms</p>
          </Link>
          <Link to='/support'>
            <p className='text-textSecondary cursor-pointer'>Support</p>
          </Link>
          <Link to='/faq'>
            <p className='text-textSecondary cursor-pointer'>FAQ</p>
          </Link>
          <Link to='/about'>
            <p className='text-textSecondary cursor-pointer'>About</p>
          </Link>
          <Link to='/contact-us'>
            <p className='text-textSecondary cursor-pointer'>Contact</p>
          </Link>
        </div>
      </div>
    </footer>
  );
};
