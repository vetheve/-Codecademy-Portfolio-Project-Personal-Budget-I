// Import express Router
const revenuesRouter = require('express').Router();

// Body-parsing middleware to parse the request body
const bodyParser = require('body-parser');
revenuesRouter.use(bodyParser.json());

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

// Export revenuesRouter for use in other modules
module.exports = revenuesRouter;

// Endpoint to handle requests for the revenues
revenuesRouter
  .route('/')
  // Get all revenues
  .get((req, res) => res.send(getAllFromDatabase('revenues')))
  // Add a new revenue to the list
  .post((req, res) => {
    addRevenueToDatabase(req.body.amount, req.body.description)
    res.status(201).send("Revenue added successfully")
  });
  
// Endpoint to handle requests to a specific revenue resource by ID
revenuesRouter
  .route('/:id')
  // Get a specific revenue by ID
  .get((req, res) => res.send(getFromDatabaseById(req.params.id)))
  // Update an existing revenue in the list
  .put((req, res) => res.send(updateInstanceInDatabase('revenues', req.params.id, req.body)))
  // Delete a specific revenue from the list
  .delete((req, res) => res.sendStatus(deleteFromDatabasebyId(req.params.id)? 204 : 500));