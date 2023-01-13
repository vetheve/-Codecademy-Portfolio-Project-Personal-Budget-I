// Import express Router
const budgetsRouter = require('express').Router();

// Body-parsing middleware to parse the request body
const bodyParser = require('body-parser');
budgetsRouter.use(bodyParser.json());

// Import functions from db.js
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db.js')

// Export budgetsRouter for use in other modules
module.exports = budgetsRouter;

// Endpoint to handle requests to budgets  
budgetsRouter
  .route('/')
  // Endpoint to get all budgets
  .get((req, res) => res.send(getAllFromDatabase('budgets')))
  // Add a new budget to the list
  .post((req, res) => res.status(201).send(addToDatabase('budgets', req.body)));
  
// Endpoint to handle requests to a specific budget resource by ID
budgetsRouter
  .route('/:id')
  // Get a specific budget by ID
  .get((req, res) => res.send(getFromDatabaseById('budgets', req.params.id,)))
  // Update an existing budget in the list
  .put((req, res) => res.send(updateInstanceInDatabase('budgets', req.params.id, req.body)))
  // Delete a specific budget from the list
  .delete((req, res) => res.sendStatus(deleteFromDatabasebyId('budgets', req.params.id)? 204 : 500));


  