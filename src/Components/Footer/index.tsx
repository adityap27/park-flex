import React from 'react';
import { IoLogoGithub, IoLogoFacebook, IoLogoInstagram, IoLogoReddit, IoLogoTwitter } from "react-icons/io5";

const Footer: React.FC = () => {
  return (
    <footer
    className="text-center bg-black lg:text-left">
    <div className="container p-6 text-white">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="mb-6 md:mb-0">
          <h5 className="mb-2 font-medium">About</h5>
          <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor placerat blandit. Vestibulum a lectus nec tellus pellentesque fringilla eget eu eros.
          </p>
        </div>
        <div className="mb-6 md:mb-0">
          <h5 className="mb-2 font-medium">Links</h5>
          <p className="mb-4">
            <IoLogoGithub size={40} style={{cursor: "pointer", display: "inline-block", marginTop: "10px"}}/>
            <IoLogoFacebook size={40} style={{cursor: "pointer", display: "inline-block", marginLeft: "50px", marginTop: "10px"}}/>
            <IoLogoInstagram size={40} style={{cursor: "pointer", display: "inline-block", marginLeft: "50px", marginTop: "10px"}}/>
            <IoLogoReddit size={40} style={{cursor: "pointer", display: "inline-block", marginLeft: "50px", marginTop: "10px"}}/>
            <IoLogoTwitter size={40} style={{cursor: "pointer", display: "inline-block", marginLeft: "50px", marginTop: "10px"}}/>
          </p>
        </div>
      </div>
    </div>
    <div
      className="text-white bg-black text-center p-4">
      © {(new Date().getFullYear())} 
      <a
        className="text-white"
        href="/"
      > ParkFlex</a>
    </div>
  </footer>
  );
}

export default Footer;