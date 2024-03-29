import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FaStripe } from "react-icons/fa";
import axios from "axios";
import { Oval } from "react-loader-spinner";

export const AccountCard = () => {
  const [amount, setAmount] = useState("");
  const [walletBalance, setWalletBalance] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    axios.get('http://localhost:3001/api/wallet/balance', {
      params: {
        userId: '66064ee77fa37b3e8edde820'
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      setWalletBalance(response.data.balance);
    }).catch(error => {
      console.error('Error fetching wallet balance: ', error);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);
  
  
  const handleAddMoneyButton = (money: string) => {
    setAmount(money);
  };
  
  const openStripeElement = () => {
    if (isValidNumber(amount)) {
      setIsModalOpen(true);
    } else {
      toast.error("Please Enter a Valid Amount");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const isValidNumber = (value: string) => {
    const validNumberRegex = /^[+-]?\d+(\.\d+)?$/;
    return validNumberRegex.test(value) && parseFloat(value) >= 0;
  };

  const handleAddMoney = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  
    if (!stripe || !elements) {
      return;
    }
  
    const cardElement = elements.getElement(CardNumberElement);
  
    if (!cardElement) {
      toast.error("Invalid card information");
      return;
    }
  
    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
  
      if (error) {
        throw new Error(error.message);
      }
  
      const res = await fetch('http://localhost:3001/api/wallet/add-money', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: parseFloat(amount), paymentMethodId: paymentMethod.id }),
      });
      const data = await res.json();
  
      if (!data.success) {
        throw new Error(data.error);
      }
  
      // Payment and backend call successful
      toast.success(data.message);
      setIsModalOpen(false);
      setAmount("");
    } catch (error:any) {
      toast.error(error.message || "Failed to process payment. Please try again.");
    }
  };
  
  
  
  return (
    <>
      <div className="relative bg-white rounded-2xl border w-full md:w-96 h-96 mx-auto md:ml-auto md:mr-20 my-20 overflow-hidden transition-transform transform hover:scale-105 ">
        <div className="p-4 flex flex-col md:flex-row md:items-center">
          <h1 className="text-2xl font-semibold text-header mb-4 md:mb-0 md:mr-4">
            My Wallet
          </h1>
          <div className="flex items-center">
    <p className="text-lg mt-1 text-center text-darkblue  font-bold">
      Available Balance:  
    </p>
    {isLoading ? (
      <div className="ml-3">
      <Oval color="#4fa94d" width={20} height={20}  />
      </div>
    ) : (
      <p className="text-lg mt-1 text-center text-darkblue ml-2 font-bold">
        ${walletBalance}
      </p>
    )}
  </div>
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
              onClick={openStripeElement}
              className="text-white font-bold text-lg md:text-2xl"
            >
              Add Money
            </button>
          </div>
          <hr className="h-16 w-px bg-white" />
          <div className="flex-1 text-center">
            <button
              className="text-white font-bold text-lg md:text-2xl"
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>

      <Modal show={isModalOpen} onHide={handleModalClose}>
        <Modal.Body>
          <FaStripe className="ml-2 mr-2" size={35} />
          <div className="border-gray-300 p-2 rounded-md">
            <div>
              <h2 className="text-lg font-semibold">Card Number</h2>
              <div className="border border-gray-300 p-2 rounded-md mb-4">
                  <CardNumberElement options={{ style: { base: { fontSize: "16px" } }, showIcon: true }} />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Expiry Date</h2>
              <div className="border border-gray-300 p-2 rounded-md mb-4">
                  <CardExpiryElement options={{ style: { base: { fontSize: "16px" } } }} />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold">CVV</h2>
              <div className="border border-gray-300 p-2 rounded-md mb-2">
                  <CardCvcElement options={{ style: { base: { fontSize: "16px" } } }} />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleModalClose} className="mr-2">
            Close
          </Button>
          <Button variant="outline-primary" disabled={!stripe} onClick={handleAddMoney}>
            Add ${amount}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
