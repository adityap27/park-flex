import { Link } from 'react-router-dom';
import ParkingSpotImage from '../assets/images/landing-page-sparking-spot.jpg';

function LandingPage() {
    return (
        <>
            <div className="text-center flex flex-col xl:px-24 xxl:px-40 py-12 px-4 lg:px-16 md:px-8">
                <div>
                    <h2 className="text-black text-xl font-bold lg:text-3xl">Looking for a perfect place to park?</h2>
                </div>
                <div className="sm:flex items-center">
                    <div className="w-full mt-8 sm:w-1/2 sm:pr-12">
                        <img src={ParkingSpotImage} alt="parking spot" className="mx-auto" />
                    </div>
                    <div className="mt-8 sm:w-1/2 sm:text-left">
                        <h4 className="text-xl font-bold text-black">Stop Looking</h4>
                        <p className="text-base text-black mt-2">ParkFlex provides unique and effective experience in booking parking spots around various cities. Users with excess space can list their parking spot to earn extra money.</p>

                        <ul className="text-left mt-8">
                            <li>
                                <div className="flex items-start">
                                    <div className="w-6 h-6 mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-black">List, Search, and Book Parking Spots</p>
                                    </div>
                                </div>
                            </li>
                            <li className="mt-3">
                                <div className="flex items-start">
                                    <div className="w-6 h-6 mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-black">Rent for short or long term</p>
                                    </div>
                                </div>
                            </li>
                            <li className="mt-3">
                                <div className="flex items-start">
                                    <div className="w-6 h-6 mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-black">Get paid for your listed parking spot</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <Link className="mt-8 bg-buttonPrimary px-6 py-4 rounded block hover:bg-blue-700 text-white font-bold sm:inline-block text-center" to='/home'>
                            Browse Spots
                        </Link>
                    </div>
                </div>
            </div>
            <div className="text-center xl:px-24 xxl:px-40 bg-gray-100 lg:px-16 flex flex-col py-16 px-4 md:px-8">
                <div className="sm:max-w-2xl w-full sm:mx-auto mt-16">
                    <p className="text-gray-900 font-bold lg:text-xl text-md">“ParkFlex saves me a lot of time as I can book parking spot from the comfort of my home. Thank you very much for this amazing platform!”</p>
                    <p className="mt-4 text-blue-500 font-bold">Carla Jones</p>
                    <p className="text-gray-600">User of ParkFlex</p>
                </div>
            </div>
        </>
    );
}

export default LandingPage;
