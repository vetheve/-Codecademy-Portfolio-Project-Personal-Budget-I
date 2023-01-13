// Import express Router
const revenuesRouter = require('express').Router();

// Body-parsing middleware to parse the request body
const bodyParser = require('body-parser');
revenuesRouter.use(bodyParser.json());

// Import functions from db.js
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db.js')

// Export revenuesRouter for use in other modules
module.exports = revenuesRouter;

// Endpoint to handle requests for the revenues
revenuesRouter
  // Get all revenues
  .get((req, res) => res.send(getAllFromDatabase('revenues')))
  // Create a new revenue
  .post((req, res) => res.send(addToDatabase('revenues', req.body)));
  
// Endpoint to handle requests to a specific revenue resource by ID
revenuesRouter
  .route('/:revenueId')
  // Get a specific revenue by ID
  .get((req, res) => res.send(getFromDatabasebyId('revenues', req.params.revenueId)))
  // Update an existing revenue in the list
  .put((req, res) => res.send(updateInstanceInDatabase('revenues', req.params.revenueId, req.body)))
  // Delete a specific revenue from the list
  .delete((req, res) => res.sendStatus(deleteFromDatabasebyId('revenues', req.params.revenueId)? 204 : 500));