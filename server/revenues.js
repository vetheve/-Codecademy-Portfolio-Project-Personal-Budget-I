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
    .get((req, res) => {
        const allRevenues = getAllFromDatabase('revenues');
        if (allRevenues) {
            res.status(200).send(allRevenues);
        } else {
            res.status(404).send({
                error: "No revenues found"
            });
        }
    })
    // Add a new revenues to the list
    .post((req, res) => {
        const addedExpense = addRevenueToDatabase(req.body.amount, req.body.description);
        if (addedExpense) {
            res.status(201).send(addedExpense);
        } else {
            res.status(400).send({
                error: "Failed to add revenue"
            });
        }
    });
  
// Endpoint to handle requests to a specific revenue resource by ID
revenuesRouter
  .route('/:id')
    // Get a specific revenue by ID
    .get((req, res) => {
        const getRevenue = getFromDatabaseById(req.params.id)
        if (getRevenue) {
            res.status(200).send(getRevenue);
        } else {
            res.status(404).send({
                error: "Revenue not found"
            });
        }
    })
    // Update an existing revenue from the list
    .put((req, res) => {
        const {
            key,
            value
        } = req.body;
        const updatedRevenue = updateInstanceInDatabase(req.params.id, key, value, jsonData);
        if (updatedRevenue) {
            res.status(200).send(updatedRevenue);
        } else {
            res.status(404).send({
                error: "Revenue not found"
            });
        }
    })
    // Delete a specific revenue from the list
    .delete((req, res) => {
        const deletedRevenue = deleteFromDatabasebyId(req.params.id);
        if (deletedRevenue) {
            res.status(200).send(deletedRevenue);
        } else {
            res.status(404).send({
                error: "Revenue not found"
            });
        }
    });