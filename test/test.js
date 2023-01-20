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
test('1.1 GET /budgets should return an array of all budgets', async t => {

    // Making a GET request to the '/budgets' route
    const res = await request(app).get('/budgets');

    // Asserting that the status code of the response is 200
    t.is(res.status, 200);

    // Asserting that the response body is an array
    t.true(Array.isArray(res.body));

    // Print the array in the console
    t.log(res.body)
});

test('1.2 GET /budgets/:id should retrieve a specific budget with the given ID', async t => {

    // Selecting a budget ID to test with
    const budgetId = '2021-01 Monthly Housing Budget';
    
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
test('2.1 GET /expenses should return an array of all expenses', async t => {

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
test('2.2 GET /expenses/:id should retrieve a specific expense with the given ID', async t => {

    // Selecting a expense ID to test with
    const expenseId = '01EXC70S4N9GC6TGYERY9BD7ZZ';
    
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
test('3.1 GET /revenues should return an array of all revenues', async t => {

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
test('3.2 GET /revenues/:id should retrieve a specific budget with the given ID', async t => {

    // Selecting a revenues ID to test with
    const revenuesId = '01EXBDPV5NM0W5RSMG31WMQM6B';
    
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

/*NET BALANCE*/

// Test to check if the Get request to '/netbalance' route returns the total net balance
test('4.1 Get /netbalance should returns the total net balance', async t => {

    // Making a Get request to the '/netbalance' route which does not exist yet
    const res = await request(app).get(`/netbalance`);
    
    // Asserting that the status code of the response is 200
    t.is(res.status, 200);
    
    // Print the object in the console
    t.log(res.body)
        
    // Asserting that the response body is an object and contains the key 'Net balance'
    t.true(typeof res.body === 'object' && 'Net balance' in res.body);
    
    // Asserting that the value of the 'Net balance' key is 5640
    t.is(res.body['Net balance'], 5640);
});

// Test to check if the Get request to '/netbalance/:year' route returns the total net balance by year
test('4.2 Get /netbalance/:year should returns the total net balance by year', async t => {

    // Selecting a year to test with
    const year = '2021';

    // Making a Get request to the '/netbalance/:year' route which does not exist yet
    const res = await request(app).get(`/netbalance/${year}`);
    
    // Asserting that the status code of the response is 200
    t.is(res.status, 200);
    
    // Print the object in the console
    t.log(res.body)
        
    // Asserting that the response body is an object and contains the key 'Net balance'
    t.true(typeof res.body === 'object' && 'Net balance' in res.body);
    
    // Asserting that the value of the 'Net balance' key is 5640
    t.is(res.body['Net balance'], 5640);
});

// Test to check if the Get request to '/netbalance/:year/:month' route returns the total net balance by year and month
test('4.3 Get /netbalance/:year/:month should returns the total net balance by year', async t => {

    // Selecting a year and a month to test with
    const year = '2021';
    const month = '11';

    // Making a Get request to the '/netbalance/:year/:month' route which does not exist yet
    const res = await request(app).get(`/netbalance/${year}/${month}`);
    
    // Asserting that the status code of the response is 200
    t.is(res.status, 200);
    
    // Print the object in the console
    t.log(res.body)
        
    // Asserting that the response body is an object and contains the key 'Net balance'
    t.true(typeof res.body === 'object' && 'Net balance' in res.body);
    
    // Asserting that the value of the 'Net balance' key is 470
    t.is(res.body['Net balance'], 470);
});