export const Footer = () => {
  return (
    <footer className='px-4 pb-2 pt-4 bg-footer'>
      <div className='flex flex-row'>
        <div className='flex flex-col flex-[2] md:flex-[3]'>
          <p className='text-textSecondary'>Park help</p>
          <p className='text-textSecondary'>&copy;2024</p>
        </div>
        <div className='flex flex-col lg:flex-row justify-between flex-1 mx-6'>
          <p className='text-textSecondary cursor-pointer'>Privacy</p>
          <p className='text-textSecondary cursor-pointer'>Terms</p>
          <p className='text-textSecondary cursor-pointer'>Support</p>
          <p className='text-textSecondary cursor-pointer'>About</p>
        </div>
      </div>
    </footer>
  );
};
