import { IoCheckmarkCircle } from "react-icons/io5";
import './style.css';

export const SuccessMessage = () => {
	return (
		<>
			<div className='flex justify-center'>
				<div className="success-container w-1/2">
					<div className="success-image">
						<IoCheckmarkCircle size={140} />
					</div>
					<div className="success-content">
						<h2>Success</h2>
						<p>Listing created successfully</p>
					</div>
				</div>
			</div>
		</>
	);
};