"use client";
import React, { useState, useEffect } from "react";

const TransactionHistory = ({ transactions }) => {
  return (
    <div className="m-10 p-4 shadow-lg">
      <h2 className="text-lg font-bold mb-4">Transaction History</h2>
      <ul>
        {transactions &&
          transactions.map((transaction, index) => (
            <li key={index} className="flex justify-between py-2">
              <div className="space-x-4">
                <span>{new Date(transaction.date).toLocaleDateString()}</span>
                <span>{transaction.description}</span>
                <span className="ml-2">- {transaction.category}</span>
              </div>
              <div
                className={`${
                  transaction.type === "income"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {transaction.amount}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
