/**
 * Author: Mann Patel
 * Defines the TransactionHistory component for displaying transaction history.
 */
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

enum TransactionType {
  TopUp = "top-up",
  Withdrawal = "withdrawal",
  Earning = "earning",
  Payment = "payment"
}

interface Transaction {
  _id: string;
  userId: string;
  date: string;
  amount: number;
  type: TransactionType;
}

const TransactionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTypes, setSelectedTypes] = useState<TransactionType[]>([
    TransactionType.TopUp,
    TransactionType.Withdrawal,
    TransactionType.Earning,
    TransactionType.Payment
  ]);

  useEffect(() => {
    fetch("http://localhost:3001/api/transaction/get-transactions", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      });
  }, []);

  const filteredTransactions = selectedTypes.length === 0
    ? transactions
    : transactions.filter((transaction) => selectedTypes.includes(transaction.type));

  const handleCheckboxChange = (type: TransactionType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-semibold text-header mb-4 text-center">
        Transaction History
      </h1>
      <div className="flex justify-end mb-4">
        <div className="flex items-center space-x-2">
          <label>
            <input
              type="checkbox"
              value={TransactionType.TopUp}
              onChange={() => handleCheckboxChange(TransactionType.TopUp)}
              className="mr-1"
              checked={selectedTypes.includes(TransactionType.TopUp)}
            />
            Top-Up
          </label>
          <label>
            <input
              type="checkbox"
              value={TransactionType.Withdrawal}
              onChange={() => handleCheckboxChange(TransactionType.Withdrawal)}
              className="mr-1"
              checked={selectedTypes.includes(TransactionType.Withdrawal)}
            />
            Withdrawal
          </label>
          <label>
            <input
              type="checkbox"
              value={TransactionType.Earning}
              onChange={() => handleCheckboxChange(TransactionType.Earning)}
              className="mr-1"
              checked={selectedTypes.includes(TransactionType.Earning)}
            />
            Earning
          </label>
          <label>
            <input
              type="checkbox"
              value={TransactionType.Earning}
              onChange={() => handleCheckboxChange(TransactionType.Payment)}
              className="mr-1"
              checked={selectedTypes.includes(TransactionType.Payment)}
            />
            Payment
          </label>
        </div>
      </div>
      <hr />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Oval color="gray" secondaryColor="true" width={60} height={60} />
          <div className="ml-2">Transactions are Loading...</div>
        </div>
      ) : (
        <div className="flex flex-col mt-5">
          {filteredTransactions.map((transaction) => (
            <div key={transaction._id} className="bg-white shadow rounded-lg w-full p-4 mb-4">
              <div>
                {transaction.type === 'withdrawal' ? (
                  <div className="font-semibold">
                    Withdrawal
                  </div>
                ) : null}
                {transaction.type === 'top-up' ? (
                  <div className="font-semibold">
                    Top-Up
                  </div>
                ) : null}
                {transaction.type === 'payment' ? (
                  <div className="font-semibold">
                    Payment
                  </div>
                ) : null}
                {transaction.type === 'earning' ? (
                  <div className="font-semibold">
                    Earnings
                  </div>
                ) : null}
              </div>
              <div className="flex justify-between">
                <div className="font-semibold">{new Date(transaction.date).toLocaleDateString()}</div>
                <div className="font-semibold">${transaction.amount}</div>
              </div>
              <div className="text-slate-700"> #{transaction._id}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
