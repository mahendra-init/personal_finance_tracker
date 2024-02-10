"use client";

import React, { useState } from "react";

const TransactionForm = ({ onClose, type, handleAddTransaction }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(
    type === "expense" ? "food" : "salary"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const transactionData = {
      description,
      amount,
      category,
      type,
    };
    console.log(transactionData);
    handleAddTransaction(transactionData);
    onClose();
  };

  return (
    <div className="text-black">
      <h2>Add New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-black w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-black w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="text-black w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            {type === "expense" ? (
              <>
                <option value="Food">Food</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Transportation">Transportation</option>
                <option value="Shopping">Shopping</option>
              </>
            ) : (
              <>
                <option value="salary">salary</option>
                <option value="others">others</option>
              </>
            )}
          </select>
        </div>
        <div className="flex space-x-3">
          <button
            type="submit"
            className={`bg-white border ${
              type === "income"
                ? "border-green-500 text-green-500"
                : "border-blue-500 text-blue-500"
            } px-4 py-2 rounded-md hover:bg-opacity-20 transition duration-300 ease-in-out`}
          >
            Add
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
