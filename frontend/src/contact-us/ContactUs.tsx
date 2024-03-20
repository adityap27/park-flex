import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const showNotification = () => {
    if (name === "") {
      toast.error("Please fill the name");
      return;
    }
    if (message === "") {
      toast.error("Please fill the message");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Email address required in proper format");
      return;
    }
    toast.success("Email sent Successfully");
  };
  return (
    <div>
      <div className='text-center mt-8 mb-4'>
        <h1 className='text-4xl font-bold'>Contact Us</h1>
      </div>
      <div className='flex flex-col lg:flex-row justify-between p-8'>
        <div className='flex-1 p-8 bg-gray-200 rounded'>
          <h2 className='text-2xl font-bold'>ParkFlex</h2>
          <br />
          <div>
            <p>
              <span className='font-bold'>Phone Number</span> : +1 (123)456-7890
            </p>
            <p>
              <span className='font-bold'>Email Address</span>:
              info@parkflex.com
            </p>
            <p className='font-bold mt-4'>Address</p>
            <p>Goldberg Building,</p>
            <p>Dalhousie University,</p>
            <p>Halifax, Nova Scotia, B3H 3Z3</p>
          </div>
        </div>
        <div className='flex-1 p-8 bg-gray-200 rounded mt-4 lg:mt-0 lg:ml-4'>
          <h2 className='text-2xl font-bold'>Send Us a Message</h2>
          <form className='mt-4'>
            <input
              type='text'
              name='name'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder='Your Name'
              className='w-full px-4 py-2 mb-4 rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-300'
            />
            <input
              type='email'
              name='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder='Your Email'
              className='w-full px-4 py-2 mb-4 rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-300'
            />
            <textarea
              name='message'
              placeholder='Your Message'
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              className='w-full px-4 py-2 mb-4 rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-300'
            ></textarea>
            <button
              type='submit'
              onClick={(e) => {
                e.preventDefault();
                showNotification();
              }}
              className='bg-buttonPrimary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
