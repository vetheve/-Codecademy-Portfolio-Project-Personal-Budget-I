// Import the express module
const express = require('express');

// Create an instance of the express Router
const apiRouter = express.Router();

// Import the budget, expenses, revenues, and balances routers
const budgetsRouter = require('./budgets.js');
const expensesRouter = require('./expenses.js');
const revenuesRouter = require('./revenues.js');
const balancesRouter = require('./balances.js')

// Use the imported routers with the '/budgets', '/expenses', '/revenues', and '/balances' routes
apiRouter.use('/budgets', budgetsRouter);
apiRouter.use('/expenses', expensesRouter);
apiRouter.use('/revenues', revenuesRouter);
apiRouter.use('/balances', balancesRouter);

// Export the apiRouter
module.exports = apiRouter

