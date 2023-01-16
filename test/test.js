const test = require("ava");  // Importing the AVA test library
const request = require("supertest");  // Importing the supertest library for making HTTP requests
const apiRouter = require('./../server/api.js');  // Importing the api router file for the all the routers
const express = require('express'); // Importing express

// Create an instance of the express application
const app = express();

// Use the apiRouter with the '/api' route
app.use('/', apiRouter);


/*BUDGETS*/

// Test to check if the GET request to '/budgets' route returns an array of all budgets
test('GET /budgets should return an array of all budgets', async t => {
    // Making a GET request to the '/budgets' route
    const res = await request(app).get('/budgets');

    // Asserting that the status code of the response is 200
    t.is(res.status, 200);

    // Asserting that the response body is an array
    t.true(Array.isArray(res.body));

    // Print the array in the console
    t.log(res.body)
});

test('GET /budgets/:id should retrieve a specific budget with the given ID', async t => {
    // Selecting a budget ID to test with
    const budgetId = 'some id - rent';
    
    // Making a GET request to the '/budgets/:id' route with the selected budget ID
    const res = await request(app).get(`/budgets/${budgetId}`);
    
    // Asserting that the status code of the response is 200
    t.is(res.status, 200);

    // Print the object in the console
    t.log(res.body)
    
    // Asserting that the response body is an object and contains the selected budget ID
    t.true(typeof res.body === 'object');

    // Asserting that the response body contains the selected budget ID
    t.true(res.body.id === budgetId);
});

/*========================================================================================*/

/*EXPENSES*/

// Test to check if the GET request to '/expenses' route returns an array of all expenses
test('GET /expenses should return an array of all expenses', async t => {
    // Making a GET request to the '/budgets' route
    const res = await request(app).get('/expenses');

    // Asserting that the status code of the response is 200
    t.is(res.status, 200);

    // Asserting that the response body is an array
    t.true(Array.isArray(res.body));
    
    // Print the array in the console
    t.log(res.body)
});

// Test to check if the GET request to '/expenses' route returns a specific expense with the given ID
test('GET /expenses/:id should retrieve a specific expense with the given ID', async t => {
    // Selecting a expense ID to test with
    const expenseId = '1423423512312';
    
    // Making a GET request to the '/expenses/:id' route with the selected expense ID
    const res = await request(app).get(`/expenses/${expenseId}`);
    
    // Asserting that the status code of the response is 200
    t.is(res.status, 200);

    // Print the object in the console
    t.log(res.body)
    
    // Asserting that the response body is an object and contains the selected expense ID
    t.true(typeof res.body === 'object' && res.body.id === expenseId);
});

/*========================================================================================*/

/*REVENUES*/

// Test to check if the GET request to '/revenues' route returns an array of all revenues
test('GET /revenues should return an array of all revenues', async t => {
    // Making a GET request to the '/budgets' route
    const res = await request(app).get('/revenues');

    // Asserting that the status code of the response is 200
    t.is(res.status, 200);

    // Asserting that the response body is an array
    t.true(Array.isArray(res.body));

        // Print the array in the console
    t.log(res.body)
});

// Test to check if the GET request to '/revenues' route returns a specific expense with the given ID
test('GET /revenues/:id should retrieve a specific budget with the given ID', async t => {
    // Selecting a revenues ID to test with
    const revenuesId = '1423423512314';
    
    // Making a GET request to the '/revenues/:id' route with the selected expense ID
    const res = await request(app).get(`/revenues/${revenuesId}`);
    
    // Asserting that the status code of the response is 200
    t.is(res.status, 200);
    
    // Print the object in the console
    t.log(res.body)
        
    // Asserting that the response body is an object and contains the selected expense ID
    t.true(typeof res.body === 'object' && res.body.id === revenuesId);
});

/*========================================================================================*/

/*BALANCE*/
