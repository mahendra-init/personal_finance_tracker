const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Function to load transactions from file
const loadTransactionsFromFile = () => {
  try {
    const data = fs.readFileSync("./transactions.json");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading transactions file:", error);
    return [];
  }
};

// Function to save transactions to file
const saveTransactionsToFile = (transactions) => {
  try {
    fs.writeFileSync(
      "./transactions.json",
      JSON.stringify(transactions, null, 2)
    );
  } catch (error) {
    console.error("Error writing transactions file:", error);
  }
};

// Function to calculate financial overview
const calculateFinancialOverview = (transactions) => {
  let balance = 0;
  let expense = 0;
  let income = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "expense") {
      expense += transaction.amount * 1;
      balance -= transaction.amount * 1;
    } else if (transaction.type === "income") {
      income += transaction.amount * 1;
      balance += transaction.amount * 1;
    }
  });

  return { balance, expense, income };
};

// API Endpoints
// 1. Fetching the user's financial overview
app.get("/pft-api/overview", (req, res) => {
  try {
    const transactions = loadTransactionsFromFile();
    const overview = calculateFinancialOverview(transactions);
    res.json(overview);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 2. Fetching transaction history
app.get("/pft-api/transactions", (req, res) => {
  try {
    const transactions = loadTransactionsFromFile();
    // Sort transactions by date in descending order
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 3. Posting a new transaction
app.post("/pft-api/transactions", (req, res) => {
  try {
    const transactions = loadTransactionsFromFile();
    const { description, amount, category, type } = req.body;
    // Basic validation
    if (!description || !amount || !category || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Add new transaction
    const newTransaction = {
      id: transactions.length + 1,
      description,
      amount,
      category,
      type,
      date: Date.now(),
    };
    transactions.push(newTransaction);
    // Update transactions file
    saveTransactionsToFile(transactions);
    // Calculate financial overview
    const overview = calculateFinancialOverview(transactions);
    res.status(201).json({ newTransaction, overview });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 4. Fetching expenses by category
app.get("/pft-api/stats", (req, res) => {
  try {
    const transactions = loadTransactionsFromFile();
    // Initialize an object to store expenses by category
    const expensesByCategory = {};

    // Calculate expenses by category
    transactions.forEach((transaction) => {
      if (transaction.type === "expense") {
        if (!expensesByCategory[transaction.category]) {
          expensesByCategory[transaction.category] = 0;
        }
        expensesByCategory[transaction.category] += transaction.amount;
      }
    });

    // Format the data as an array of objects
    const statsData = Object.keys(expensesByCategory).map((category) => ({
      category,
      amount: expensesByCategory[category],
    }));

    res.json(statsData);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
