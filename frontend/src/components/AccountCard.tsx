/*
This component is made for the Card handling the account transaction for add and withdraw.
The card has been made which will show the available balance and let user interact with it. 
User can add/withdraw money from the wallet.
*/

import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const AccountCard = () => {
  const [amount, setAmount] = useState("");
  const [availableBalance, setAvailableBalance] = useState(1000);

  const handleAddMoneyButton = (money: React.SetStateAction<string>) => {
    setAmount(money);
  };

  const handleAddMoney = () => {
    if (isValidNumber(amount)) {
      const newBalance = availableBalance + parseFloat(amount);
      setAvailableBalance(newBalance);
      toast.success("Successfully Added to Wallet");
    } else {
      toast.error("Please Enter a Valid Amount");
    }
  };

  const handleWithdraw = () => {
    if (isValidNumber(amount) && parseFloat(amount) <= availableBalance) {
      const newBalance = availableBalance - parseFloat(amount);
      setAvailableBalance(newBalance);
      toast.success("Successfully Withdrawn from Wallet");
    } else if (isValidNumber(amount) && parseFloat(amount) > availableBalance) {
      toast.error("Insufficient Funds");
    } else {
      toast.error("Please Enter a Valid Amount");
    }
  };

  // Front-End Validation for input correctly given.
  const isValidNumber = (value: string) => {
    const validNumberRegex = /^[+-]?\d+(\.\d+)?$/;
    return validNumberRegex.test(value) && parseFloat(value) >= 0;
  };

  return (
    <>
    <div className="relative bg-white rounded-2xl border w-full md:w-96 h-96 mx-auto md:ml-auto md:mr-20 my-20 overflow-hidden transition-transform transform hover:scale-105 ">
      <div className="p-4 flex flex-col md:flex-row md:items-center">
        <h1 className="text-2xl font-semibold text-header mb-4 md:mb-0 md:mr-4">
          My Wallet
        </h1>
        <p className="text-lg mt-1 text-center text-darkblue ml-5 font-bold">
          Available Balance ${availableBalance}
        </p>
      </div>
      <hr className="border-t border-gray-700 my-4 md:my-0 w-full" />

      <div className="flex flex-col items-center p-4 mt-4">
        <input
          type="text"
          placeholder="Enter amount..."
          className="border border-gray-300 p-2 rounded-md w-full mb-4"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <div className="flex flex-wrap justify-center gap-1">
          <button
            onClick={() => handleAddMoneyButton("50.00")}
            className="bg-white border border-header text-header px-4 py-2 rounded-md hover:bg-header hover:text-white transition-transform transform hover:scale-105 mb-2"
          >
            + $50.00
          </button>
          <button
            onClick={() => handleAddMoneyButton("100.00")}
            className="bg-white border border-header text-header px-4 py-2 rounded-md hover:bg-header hover:text-white transition-transform transform hover:scale-105 mb-2"
          >
            + $100.00
          </button>
          <button
            onClick={() => handleAddMoneyButton("150.00")}
            className="bg-white border border-header text-header px-4 py-2 rounded-md hover:bg-header hover:text-white transition-transform transform hover:scale-105 mb-2"
          >
            + $150.00
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-header rounded-b-2xl flex items-center justify-between p-4">
        <div className="flex-1 text-center">
          <button
            onClick={handleAddMoney}
            className="text-white font-bold text-lg md:text-2xl"
          >
            Add Money
          </button>
        </div>
        <hr className="h-16 w-px bg-white" />
        <div className="flex-1 text-center">
          <button
            onClick={handleWithdraw}
            className="text-white font-bold text-lg md:text-2xl"
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

