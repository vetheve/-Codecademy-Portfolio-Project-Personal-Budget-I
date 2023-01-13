// Import express Router
const balanceRouter = require('express').Router();

// Body-parsing middleware to parse the request body
const bodyParser = require('body-parser');
balanceRouter.use(bodyParser.json());

// Import functions from db.js
const {
    getAllFromDatabase,
    getBalanceFromDatabase
} = require('./db.js')

// Export balanceRouter for use in other modules
module.exports = balanceRouter;

// Endpoint to handle requests for the balance
balanceRouter
  // Get all revenues
  .get((req, res) => res.send(getAllFromDatabase('balance')))
  
// Endpoint to handle requests for the balance
balanceRouter
  .route('/:year/:month')
  // Get all revenues for a specific month and year
  .get((req, res) => {
    const year = req.params.year;
    const month = req.params.month;
    res.send(getAllFromDatabase('balance', year, month));
  });

// Endpoint to handle requests for the budget balance
balanceRouter
  .route('/budgets/:budget_id/:year/:month')
  // Get balance information for a specific budget category and month/year
  .get((req, res) => {
    const budget_id = req.params.budget_id;
    const year = req.params.year;
    const month = req.params.month;
    res.send(getBalanceFromDatabase(budget_id, year, month));
  });

/*

const express = require('express');
const balanceRouter = express.Router();

balanceRouter
  .route('/budgets/balance/:year/:month')
  // Get all balance for budget categories in a specific month and year
  .get((req, res) => {
    const year = req.params.year;
    const month = req.params.month;
    const balance = getAllFromDatabase('balance').filter(balance => {
      // Filter the balance based on the specified year and month
      return balance.year === year && balance.month === month;
    });
    res.send(balance);

  });

  balanceRouter
  .route('/budgets/:budget_id/balance/:year/:month')
  // Get balance for a specific budget category in a specific month and year
  .get((req, res) => {
    const budget_id = req.params.budget_id;
    const year = req.params.year;
    const month = req.params.month;
    const balance = getAllFromDatabase('balance').filter(balance => {
      // Filter the balance based on the specified budget_id, year and month
      return balance.budget_id === budget_id && balance.year === year && balance.month === month;
    });
    if(balance.length > 0) {
      res.send(balance[0]); // return the first match
    } else {
      res.status(404).send({error: 'balance not found'}); //balance not found
    }
  });

  */