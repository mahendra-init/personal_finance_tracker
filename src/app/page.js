"use client";
import React, { useState, useEffect } from "react";
import OverviewCard from "@/components/OverviewCard";
import TransactionHistory from "@/components/TransactionHistory";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/pft-api/transactions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch transaction history");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Transaction history:", data);
        setTransactions(data);
      })
      .catch((error) => {
        console.error("Error fetching transaction history:", error);
      });
  }, [trigger]);

  const handleTrigger = () => {
    setTrigger((prev) => !prev);
  };
  return (
    <>
      <OverviewCard handleTrigger={handleTrigger} />
      <TransactionHistory transactions={transactions} />
    </>
  );
}
