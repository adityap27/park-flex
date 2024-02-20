import AccountCard from "../components/AccountCard";
import { ToastContainer } from "react-toastify";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdRedeem } from "react-icons/md";
import { FaWallet } from "react-icons/fa";

export const Wallet = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 p-4 text-gray-800 mt-5">
          Welcome to PnPSpace, your go-to platform for hassle-free parking!
          Explore our services and manage your parking transactions with ease.
          Use your wallet as cash to pay for your spots and also to earn money
          from your own unutilized parking spaces
          <div className="flex mt-5 flex-col md:flex-row">
            <div className="flex items-center flex-col ml-0 md:ml-5 mt-5 md:mt-0 text-center md:w-1/3">
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
        <AccountCard />
      </div>
      <ToastContainer />
    </>
  );
};

