/**
 * Author: Mann Patel
 * Defines the Wallet component for managing wallet operations.
 */ 
import { AccountCard } from "./AccountCard";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdRedeem } from "react-icons/md";
import { FaWallet } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"
const stripePublishableKey = loadStripe("pk_test_51Oz4veIzvURxPk5bC9PpMM4Jn63K2GKU4psmnQ7VOVCCqTtCO18BM102VOPf3F2mPJMS7hfpufcNFf0qoaM1FF5700ZxpuZ1f2");

const Wallet = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 p-4 text-gray-800 mt-5">
          Welcome to PnPSpace, your go-to platform for hassle-free parking!
          Explore our services and manage your parking transactions with ease.
          Use your wallet as cash to pay for your spots and also to earn money
          from your own unutilized parking spaces
          <div className="flex mt-5 flex-col md:flex-row">
            <div className="flex items-center flex-col text-center md:w-1/3">
              <FaWallet size={100} className="" />
              <p>Top-Up Wallet with ease</p>
            </div>
            <div className="flex items-center flex-col ml-0 md:ml-5 mt-5 md:mt-0 text-center md:w-1/3">
              <BiMoneyWithdraw size={100} />
              <p>Withdraw your earning into your account.</p>
            </div>
            <div className="flex items-center flex-col ml-0 md:ml-5 mt-5 md:mt-0 text-center md:w-1/3">
              <MdRedeem size={100} />
              <p>Redeem your gift cards into the wallet</p>
            </div>
          </div>
        </div>
        <Elements stripe={stripePublishableKey}>
        <AccountCard />
        </Elements>
      </div>
    </>
  );
};

export default Wallet;
