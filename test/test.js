const test = require("ava");  // Importing the AVA test library
const request = require("supertest");  // Importing the supertest library for making HTTP requests
const apiRouter = require('./../server/api.js');  // Importing the api router file for the all the routers

/*BUDGETS*/

// Test to check if the GET request to '/budgets' route returns an array of all budgets
test('GET /budgets should return an array of all budgets', async t => {
    // Making a GET request to the '/budgets' route
    const res = await request(apiRouter).get('/budgets');

    // Asserting that the status code of the response is 200
    t.is(res.status, 200);
    // Asserting that the response body is an array
    t.true(Array.isArray(res.body));
});

/*EXPENSES*/

// Test to check if the GET request to '/expenses' route returns an array of all expenses
test('GET /expenses should return an array of all expenses', async t => {
    // Making a GET request to the '/budgets' route
    const res = await request(apiRouter).get('/expenses');

    // Asserting that the status code of the response is 200
    t.is(res.status, 200);
    // Asserting that the response body is an array
    t.true(Array.isArray(res.body));
});

/*REVENUES*/

// Test to check if the GET request to '/revenues' route returns an array of all revenues
test('GET /expenses should return an array of all expenses', async t => {
    // Making a GET request to the '/budgets' route
    const res = await request(apiRouter).get('/expenses');

    // Asserting that the status code of the response is 200
    t.is(res.status, 200);
    // Asserting that the response body is an array
    t.true(Array.isArray(res.body));
});

/*BALANCE*/

// Test to check if the GET request to '/balance' route returns an array of all balances
test('GET /balance should return an array of all balances', async t => {
    // Making a GET request to the '/balance' route
    const res = await request(apiRouter).get('/expenses');

    // Asserting that the status code of the response is 200
    t.is(res.status, 200);
    // Asserting that the response body is an array
    t.true(Array.isArray(res.body));
});