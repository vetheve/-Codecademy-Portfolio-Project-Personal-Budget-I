// Import express Router
const budgetBalanceRouter = require('express').Router();

// Body-parsing middleware to parse the request body
const bodyParser = require('body-parser');
budgetBalanceRouter.use(bodyParser.json());

// Import functions from db.js
const {
  getAllFromDatabase,
  getFromDatabaseById,
  getFromDatabaseByItem,
  getFromDatabaseByCategory,
  filterNetBalanceByMonth,
  filterNetBalanceByYear,
  filterBudgetBalanceByMonth,
  filterBudgetBalanceByYear,
  addBudgetToDatabase,
  addExpenseToDatabase,
  addRevenueToDatabase,
  calculateNetBalance,
  calculateBudgetBalance,
} = require('./db.js')

// Export balanceRouter for use in other modules
module.exports = budgetBalanceRouter;

// Endpoint to handle requests for the total budget balance
budgetBalanceRouter
  .route('/')
  // Get the total budget balance
  .get((req, res) => res.send(calculateBudgetBalance()))
  
// Endpoint to handle requests for the total budget balance by year and month
budgetBalanceRouter
  .route('/:year/:month')
  // Get the total budget balance for a specific year and month
  .get((req, res) => {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);
    res.send(calculateBudgetBalance(filterBudgetBalanceByMonth(month, year)));
  });

// Endpoint to handle requests for the balance by year
budgetBalanceRouter
.route('/:year')
// Get the total budget balance for a specific year
.get((req, res) => {
  const year = parseInt(req.params.year);
  res.send(calculateBudgetBalance(filterBudgetBalanceByYear(year)));
});

// Endpoint to handle requests for the balance by category
budgetBalanceRouter
.route('/:category')
// Get the total budget balance for a specific category
.get((req, res) => {
  const category = req.params.category;
  res.send(calculateBudgetBalance(getFromDatabaseByCategory(category)));
});

budgetBalanceRouter
.route('/:year/:category')
// Get the total budget balance for a specific category and by year
.get((req, res) => {
  const category = req.params.category;
  const year = parseInt(req.params.year);
  const filteredRecords = filterBudgetBalanceByYear(year);
  res.send(calculateBudgetBalance(getFromDatabaseByCategory(category,filteredRecords)));
});

budgetBalanceRouter
.route('/:year/:month/:category')
// Get the total budget balance for a specific category and by year and month
.get((req, res) => {
  const category = req.params.category;
  const year = parseInt(req.params.year);
  const month = parseInt(req.params.month);
  const filteredRecords = filterBudgetBalanceByMonth(month, year);
  res.send(calculateBudgetBalance(getFromDatabaseByCategory(category,filteredRecords)));
});
