const test = require("ava");  // Importing the AVA test library
const request = require("supertest");  // Importing the supertest library for making HTTP requests
const apiRouter = require('./../server/api.js');  // Importing the api router file for the all the routers
const express = require('express'); // Importing express

// Create an instance of the express application
const app = express();

// Use the apiRouter with the '/api' route
app.use('/', apiRouter);

// Import functions from db.js
const {
    getFromDatabaseByItem
} = require('./../server/db.js')


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
    //t.log(res.body)
});

// Test to check if the GET request to '/budgets/:id' route returns a specific budget by ID
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

// Test to check if the POST request to '/budgets' route add a new budget in the list budgets
test('1.3 POST /budgets should add a new budget to the list', async t => {

    // Creating a new budget object to add
    const newBudget = {
        id: "2022-01 Monthly Food Budget",
        category: "food",
        amount: "0"
    };

    // Making a POST request to the '/budgets' route with the new budget object
    const res = await request(app).post('/budgets').send(newBudget);

    // Asserting that the status code of the response is 201
    t.is(res.status, 201);

    // Print the object in the console
    t.log(res.body)

    // Asserting that the new budget has been added to the list
    const addedBudget = await getFromDatabaseByItem('budgets','id','2022-01 Monthly Food Budget');
    
    // Check that the added budget exist
    t.truthy(addedBudget);
});

// Test to check if the POST request to '/budgets' route add a new budget in the list budgets
test('1.4 PUT /budgets should update a budget in the list', async t => {

    // Creating a new budget object to update
    const updatedBudget = {
        id: "2021-12 Monthly Personnal Budget",
        category: "Very personnal",
    };

    // Making a PUT request to the '/budgets' route with the updated budget object
    const res = await request(app).put('/budgets').send(updatedBudget);

    // Asserting that the status code of the response is 200
    t.is(res.status, 200);

    // Print the object in the console
    t.log(res.body)

    // Asserting that the budget has been updated in the list
    const updated = await getFromDatabaseByItem('budgets','id','2021-12 Monthly Personnal Budget');
    
    // Check that the added budget exist
    t.truthy(updated);
});

// Test to check if the DELETE request to '/budgets' route delete a specific budget by ID
test('1.5 DELETE /budgets/:id should delete a specific budget with the given ID', async t => {

    // Selecting a budget ID to test with
    const budgetId = '2022-02 Personnal Budget';
    
    // Making a DELETE request to the '/budgets/:id' route with the selected budget ID
    const res = await request(app).delete(`/budgets/${budgetId}`);
    
    // Asserting that the status code of the response is 204
    t.is(res.status, 204);
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
    //t.log(res.body)
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

// Test to check if the POST request to '/expenses' route add a new expense in the list expenses
test('2.3 POST /expenses should add a new expense to the list', async t => {

    // Creating a new expense object to add
    const newExpense = {
        amount: '0',
        description: 'Malabar',
        budget_id: "2022-01 Monthly Food Budget",
        category: "food"       
    };

    // Making a POST request to the '/expenses' route with the new expense object
    const res = await request(app).post('/expenses').send(newExpense);

    // Asserting that the status code of the response is 201
    t.is(res.status, 201);

    // Print the object in the console
    t.log(res.body)

    // Asserting that the new expense has been added to the list
    const addedExpense = await getFromDatabaseByItem('expenses','budget_id','2022-01 Monthly Food Budget');
    
    // Check that the added expense exist
    t.truthy(addedExpense);
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
    //t.log(res.body)
});

// Test to check if the GET request to '/revenues' route returns a specific revenue with the given ID
test('3.2 GET /revenues/:id should retrieve a specific budget with the given ID', async t => {

    // Selecting a revenues ID to test with
    const revenuesId = '01EXBDPV5NM0W5RSMG31WMQM6B';
    
    // Making a GET request to the '/revenues/:id' route with the selected revenue ID
    const res = await request(app).get(`/revenues/${revenuesId}`);
    
    // Asserting that the status code of the response is 200
    t.is(res.status, 200);
    
    // Print the object in the console
    t.log(res.body)
        
    // Asserting that the response body is an object and contains the selected revenue ID
    t.true(typeof res.body === 'object' && res.body.id === revenuesId);
});

// Test to check if the POST request to '/revenues' route add a new revenue in the list revenues
test('3.3 POST /revenues should add a new revenue to the list', async t => {

    // Creating a new revenue object to add
    const newRevenue = {
        amount: '0',
        description: 'Salary for January 2022'
    };

    // Making a POST request to the '/revenues' route with the new revenue object
    const res = await request(app).post('/revenues').send(newRevenue);

    // Asserting that the status code of the response is 201
    t.is(res.status, 201);

    // Print the object in the console
    t.log(res.body)

    // Asserting that the new revenue has been added to the list
    const addedRevenue = await getFromDatabaseByItem('revenues','description','Salary for January 2022');
    
    // Check that the added revenue exist
    t.truthy(addedRevenue);
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

/*========================================================================================*/

/*BUDGET BALANCE*/

// Test to check if the Get request to '/budgetbalance' route returns the total budget balance
test('5.1 Get /budgetbalance should returns the total budget balance', async t => {

    // Making a Get request to the '/budgetbalance' route which does not exist yet
    const res = await request(app).get(`/budgetbalance`);
    
    // Asserting that the status code of the response is 200
    t.is(res.status, 200);
    
    // Print the object in the console
    t.log(res.body)
        
    // Asserting that the response body is an object and contains the key 'Budget balance'
    t.true(typeof res.body === 'object' && 'Budget balance' in res.body);
    
    // Asserting that the value of the 'Budget balance' key is 4140
    t.is(res.body['Budget balance'], 4140);
});

// Test to check if the Get request to '/budgetbalance/:year' route returns the total budget balance by year
test('5.2 Get /budgetbalance/:year should returns the total budget balance by year', async t => {

    // Selecting a year to test with
    const year = '2021';

    // Making a Get request to the '/budgetbalance/:year' route which does not exist yet
    const res = await request(app).get(`/budgetbalance/${year}`);
    
    // Asserting that the status code of the response is 200
    t.is(res.status, 200);
    
    // Print the object in the console
    t.log(res.body)
        
    // Asserting that the response body is an object and contains the key 'Budget balance'
    t.true(typeof res.body === 'object' && 'Budget balance' in res.body);
    
    // Asserting that the value of the ''Budget balance'' key is 4140
    t.is(res.body['Budget balance'], 4140);
});

// Test to check if the Get request to '/budgetbalance/:year/:month' route returns the total budget balance by year and month
test('5.3 Get /budgetbalance/:year/:month should returns the total budget balance by year and month', async t => {

    // Selecting a year and a month to test with
    const year = '2021';
    const month = '11';

    // Making a Get request to the '/budgetbalance/:year/:month' route which does not exist yet
    const res = await request(app).get(`/budgetbalance/${year}/${month}`);
    
    // Asserting that the status code of the response is 200
    t.is(res.status, 200);
    
    // Print the object in the console
    t.log(res.body)
        
    // Asserting that the response body is an object and contains the key 'Budget balance'
    t.true(typeof res.body === 'object' && 'Budget balance' in res.body);
    
    // Asserting that the value of the 'Budget balance' key is 345
    t.is(res.body['Budget balance'], 345);
});

// Test to check if the Get request to '/budgetbalance/:category' route returns the total budget balance by category
test('5.4 Get /budgetbalance/:category should returns the total budget balance by category', async t => {

    // Selecting an category to test with
    const category = 'housing';

    // Making a Get request to the '/budgetbalance/:category' route which does not exist yet
    const res = await request(app).get(`/budgetbalance/${category}`);
    
    // Asserting that the status code of the response is 200
    t.is(res.status, 200);
    
    // Print the object in the console
    t.log(res.body)
        
    // Asserting that the response body is an object and contains the key 'Budget balance'
    t.true(typeof res.body === 'object' && 'Budget balance' in res.body);
    
    // Asserting that the value of the 'Budget balance' key is 300
    t.is(res.body['Budget balance'], 300);
});

// Test to check if the Get request to '/budgetbalance/:year/:category' route returns the total budget balance by year and by category
test('5.5 Get /budgetbalance/:year/:category should returns the total budget balance by year and by category', async t => {

    // Selecting a year to test with
    const year = '2021';

    // Selecting an category to test with
    const category = 'housing';

    // Making a Get request to the '/budgetbalance/:year' route which does not exist yet
    const res = await request(app).get(`/budgetbalance/${year}/${category}`);
    
    // Asserting that the status code of the response is 200
    t.is(res.status, 200);
    
    // Print the object in the console
    t.log(res.body)
        
    // Asserting that the response body is an object and contains the key 'Budget balance'
    t.true(typeof res.body === 'object' && 'Budget balance' in res.body);
    
    // Asserting that the value of the 'Budget balance' key is 300
    t.is(res.body['Budget balance'], 300);
});

// Test to check if the Get request to '/budgetbalance/:year/:month/:category' route returns the total budget balance by year, month, and category
test('5.6 Get /budgetbalance/:year/:month/:category should returns the total budget balance by year and month', async t => {

    // Selecting a year and a month to test with
    const year = '2021';
    const month = '11';

    // Selecting an category to test with
    const category = 'housing';

    // Making a Get request to the '/budgetbalance/:year/:month' route which does not exist yet
    const res = await request(app).get(`/budgetbalance/${year}/${month}/${category}`);
    
    // Asserting that the status code of the response is 200
    t.is(res.status, 200);
    
    // Print the object in the console
    t.log(res.body)
        
    // Asserting that the response body is an object and contains the key 'Budget balance'
    t.true(typeof res.body === 'object' && 'Budget balance' in res.body);
    
    // Asserting that the value of the 'Budget balance' key is 25
    t.is(res.body['Budget balance'], 25);
});