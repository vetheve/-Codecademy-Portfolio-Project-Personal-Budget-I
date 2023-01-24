// Import express Router
const expensesRouter = require('express').Router();

// Body-parsing middleware to parse the request body
const bodyParser = require('body-parser');
expensesRouter.use(bodyParser.json());

// Import functions from db.js
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db.js')

// Export expensesRouter for use in other modules
module.exports = expensesRouter;

// Endpoint to handle requests for the expenses
expensesRouter
  .route('/')
  // Get all expenses
  .get((req, res) => res.send(getAllFromDatabase('expenses')))
  // Create a new expense
  .post((req, res) => res.send(addToDatabase('expenses', req.body)));
  
// Endpoint to handle requests to a specific expense resource by ID
expensesRouter
  .route('/:expenseId')
  // Get a specific expense by ID
  .get((req, res) => res.send(getFromDatabaseById(req.params.expenseId)))
  // Update an existing expense in the list
  .put((req, res) => res.send(updateInstanceInDatabase('expenses', req.params.expenseId, req.body)))
  // Delete a specific expense from the list
  .delete((req, res) => res.sendStatus(deleteFromDatabasebyId('expenses', req.params.expenseId)? 204 : 500));