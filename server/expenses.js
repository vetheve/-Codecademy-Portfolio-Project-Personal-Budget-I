// Import express Router
const expensesRouter = require('express').Router();

// Body-parsing middleware to parse the request body
const bodyParser = require('body-parser');
expensesRouter.use(bodyParser.json());

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

// Export expensesRouter for use in other modules
module.exports = expensesRouter;

// Endpoint to handle requests for the expenses
expensesRouter
  .route('/')
  // Get all expenses
  .get((req, res) => res.send(getAllFromDatabase('expenses')))
  // Add a new expense to the list
  .post((req, res) => {
    addExpenseToDatabase(req.body.amount, req.body.description, req.body.budget_id, req.body.category)
    res.status(201).send("Expense added successfully")
  });
  
// Endpoint to handle requests to a specific expense resource by ID
expensesRouter
  .route('/:id')
  // Get a specific expense by ID
  .get((req, res) => res.send(getFromDatabaseById(req.params.id)))
  // Update an existing expense in the list
  .put((req, res) => res.send(updateInstanceInDatabase('expenses', req.params.id, req.body)))
  // Delete a specific expense from the list
  .delete((req, res) => res.sendStatus(deleteFromDatabasebyId(req.params.id)? 204 : 500));