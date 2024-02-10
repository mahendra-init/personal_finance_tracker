"use client";

import React, { useState, useEffect } from "react";
import { currencyFormatter } from "../lib/utils";
import TransactionForm from "./TransactionForm";

const OverviewCard = ({ handleTrigger }) => {
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("");
  const [balOverview, setBalOverview] = useState({});

  const handleToggleModal = (val) => {
    setType(val);
    setShowModal(!showModal);
  };

  useEffect(() => {
    fetch("http://localhost:4000/pft-api/overview")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch financial overview");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Financial overview:", data);
        setBalOverview(data);
      })
      .catch((error) => {
        console.error("Error fetching financial overview:", error);
      });
  }, []);

  const handleAddTransaction = (transactionData) => {
    if (
      transactionData.type == "expense" &&
      transactionData.amount > balOverview.balance
    ) {
      alert("You do not have enough funds for this transaction");
      return;
    }

    // Send POST request to server with the transaction object as JSON in the body
    fetch("http://localhost:4000/pft-api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add new transaction");
        }
        return response.json();
      })
      .then((data) => {
        console.log("New transaction added:", data);
        setBalOverview(data.overview);
        handleTrigger();
      })
      .catch((error) => {
        console.error("Error adding new transaction:", error);
      });
  };

  return (
    <div className="m-10 p-4 shadow-lg text-white">
      {/* My Balance */}
      <div className="flex items-center justify-start space-x-4 mb-6">
        <div className="bg-gray-700 rounded-md p-4">
          <small className="text-md text-gray-400">My Balance</small>
          <p className="text-4xl font-bold">
            {currencyFormatter(balOverview.balance ? balOverview.balance : 0)}
          </p>
        </div>
        <div className="bg-gray-700 rounded-md p-4">
          <small className="text-md text-gray-400">Expense</small>
          <p className="text-4xl font-bold">
            {currencyFormatter(balOverview.expense ? balOverview.expense : 0)}
          </p>
        </div>
        <div className="bg-gray-700 rounded-md p-4">
          <small className="text-md text-gray-400">Income</small>
          <p className="text-4xl font-bold">
            {currencyFormatter(balOverview.income ? balOverview.income : 0)}
          </p>
        </div>
      </div>

      {/* Add Expense and Add Income buttons */}
      <div className="flex space-x-2">
        <button
          className="bg-transparent border border-blue-500 text-blue-500 px-2 py-2 rounded-md hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out"
          onClick={() => {
            handleToggleModal("expense");
          }}
        >
          + Expense
        </button>
        <button
          className="bg-transparent border border-green-500 text-green-500 px-2 py-2 rounded-md hover:bg-green-500 hover:text-white transition duration-300 ease-in-out"
          onClick={() => {
            handleToggleModal("income");
          }}
        >
          + Income
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-400 p-4 rounded-md">
            <TransactionForm
              onClose={() => setShowModal(false)}
              type={type}
              handleAddTransaction={handleAddTransaction}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewCard;
