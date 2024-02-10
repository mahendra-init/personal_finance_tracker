"use client";
import React, { useState, useEffect } from "react";
import { currencyFormatter } from "@/lib/utils";
import { FaBowlFood } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { BiSolidCameraMovie } from "react-icons/bi";
import { CiShoppingBasket } from "react-icons/ci";
import { MdHealthAndSafety } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import DoughnutChart from "@/components/DoughnutChart";

export default function Home() {
  // Example data for expenses and stats
  // const expensesByCategory = [
  //   { category: "Food", amount: 3000 },
  //   { category: "Transportation", amount: 1500 },
  //   { category: "Entertainment", amount: 2000 },
  //   { category: "Shopping", amount: 2500 },
  //   { category: "Health", amount: 1200 },
  //   { category: "Education", amount: 1800 },
  // ];

  const [expensesByCategory, setExpensesByCategory] = useState([]);
  useEffect(() => {
    try {
      fetch("http://localhost:4000/pft-api/stats")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setExpensesByCategory(data);
        });
    } catch (error) {
      console.log("Error");
    }
  }, []);

  // Function to render appropriate icon based on category
  const renderIcon = (category) => {
    switch (category) {
      case "Food":
        return <FaBowlFood className="text-blue-500" />;
      case "Transportation":
        return <FaCar className="text-green-500" />;
      case "Entertainment":
        return <BiSolidCameraMovie className="text-yellow-500" />;
      case "Shopping":
        return <CiShoppingBasket className="text-purple-500" />;
      case "Health":
        return <MdHealthAndSafety className="text-red-500" />;
      case "Education":
        return <AiOutlineHome className="text-orange-500" />;
      default:
        return null;
    }
  };

  const doughnutChartData = {
    labels: expensesByCategory.map((expense) => expense.category),
    datasets: [
      {
        label: "Expenses",
        data: expensesByCategory.map((expense) => expense.amount),
        backgroundColor: [
          "#FF6384", // Red for Food
          "#36A2EB", // Blue for Transportation
          "#FFCE56", // Yellow for Entertainment
          "#9933CC", // Purple for Shopping
          "#FF5733", // Orange for Health
          "#66CDAA", // Green for Home
        ],
      },
    ],
  };

  return (
    <div className="m-10 p-4 shadow-lg flex space-x-2">
      {/* My Expenses */}
      <div className="w-1/2">
        <small className="text-md text-gray-400">My Expenses</small>
        <ul className="mt-4">
          {expensesByCategory &&
            expensesByCategory.map((expense, index) => (
              <li
                key={index}
                className="flex items-center justify-between space-x-2 transition-all duration-300 ease-in-out hover:bg-slate-500 rounded-md p-4"
              >
                <div className=" flex items-center space-x-2">
                  <span>{renderIcon(expense.category)}</span>
                  <span>{expense.category}</span>
                </div>
                <div className="pr-4">{currencyFormatter(expense.amount)}</div>
              </li>
            ))}
        </ul>
      </div>

      {/* Statistics */}
      <div className="flex justify-center">
        <small className="text-md text-gray-400 mb-4">Statistics</small>
        {expensesByCategory && <DoughnutChart data={doughnutChartData} />}
      </div>
    </div>
  );
}
