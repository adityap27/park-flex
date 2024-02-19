import React from 'react';
import { IoCheckmarkCircle } from "react-icons/io5";
import Navbar from '../Navbar/index.tsx';
import Footer from '../Footer/index.tsx';
import './style.css'; 

const SuccessPage: React.FC = () => {
  return (
    <>
	<Navbar></Navbar>
	<div className='flex justify-center'>
	<div className="success-container w-1/2">
		<div className="success-image">
			<IoCheckmarkCircle size={140}/>
		</div>
		<div className="success-content">
			<h2>Success</h2>
			<p>Listing created successfully</p>
		</div>
		</div>
	</div>
	<Footer></Footer>
    </>
  );
};

export default SuccessPage;