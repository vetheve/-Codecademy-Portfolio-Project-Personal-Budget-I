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
    .get((req, res) => {
        const allExpenses = getAllFromDatabase('expenses');
        if (allExpenses) {
            res.status(200).send(allExpenses);
        } else {
            res.status(404).send({
                error: "No expenses found"
            });
        }
    })
    // Add a new expenses to the list
    .post((req, res) => {
        const addedExpense = addExpenseToDatabase(req.body.amount, req.body.description, req.body.budget_id, req.body.category);
        if (addedExpense) {
            res.status(201).send(addedExpense);
        } else {
            res.status(400).send({
                error: "Failed to add expense"
            });
        }
    });
  
// Endpoint to handle requests to a specific expenseresource by ID
expensesRouter
    .route('/:id')
    // Get a specific expenseby ID
    .get((req, res) => {
        const getExpense = getFromDatabaseById(req.params.id)
        if (getExpense) {
            res.status(200).send(getExpense);
        } else {
            res.status(404).send({
                error: "Expense not found"
            });
        }
    })
    // Update an existing expense in the list
    .put((req, res) => {
        const {
            key,
            value
        } = req.body;
        const updatedExpense = updateInstanceInDatabase(req.params.id, key, value);
        if (updatedExpense) {
            res.status(200).send(updatedExpense);
        } else {
            res.status(404).send({
                error: "Expense not found"
            });
        }
    })
    // Delete a specific expense from the list
    .delete((req, res) => {
        const deletedExpense = deleteFromDatabasebyId(req.params.id);
        if (deletedBudget) {
            res.status(200).send(deletedExpense);
        } else {
            res.status(404).send({
                error: "Expense not found"
            });
        }
    });