# Personal Budget

## Project Overview

For this project, you will build an API that allows clients to create and manage a personal budget. Using Envelope Budgeting principles, your API should allow users to manage budget envelopes and track the balance of each envelope. Your API should follow best practices regarding REST endpoint naming conventions, proper response codes, etc. Make sure to include data validation to ensure users do not overspend their budget!

##  Project Objectives:
Build an API using Node.js and Express
Be able to create, read, update, and delete envelopes
Create endpoint(s) to update envelope balances
Use Git version control to keep track of your work
Use the command line to navigate your files and folders
Use Postman to test API endpoints
Prerequisites:
- Command line and file navigation
- Javascript
- Node.js
- Express
- Git and GitHub
- Postman

## Endpoints
- `/budgets` (CR)
- `/budgets/{budget_id}` (RUD)
- `/expenses` (CR)
- `/expenses/{expense_id}` (RUD)
- `/revenues` (CR)
- `/expenses/{revenue_id}` (RUD)
- `/balance` (Read-Only)
- `/budgets/balance/YYYY/MM` (Read-Only)
- `/budgets/{budget_id}/balance/YYYY/MM` (Read-Only)

## Endpoints Models
### `/budgets`
#### CREATE
- __POST /budgets__ -- Creates a new budget object.

##### Request 
```javascript
{
    "id": String
    "name": String
    "amount": Number
}
```
##### Response
```javascript
{
    "id": String
    "name": String
    "amount": Number
}
```
#### READ
- __GET /budgets__ -- Retrieves a list of all budget objects.
```javascript
[{
    "id": String
    "name": String
    "amount": Number
},
...
{
    "id": String
    "name": String
    "amount": Number
}]
```
#### *Code snippet*
```javascript
// Endpoint to handle requests to budgets  
budgetsRouter
  .route('/budgets')
  // Endpoint to get all budgets
  .get((req, res) => res.send(getAllFromDatabase('budgets')))
  // Add a new budget to the list
  .post((req, res) => res.status(201).send(addToDatabase('budgets', req.body)));
```

### `/budgets/{budget_id}`
#### READ
- __GET /budgets/:budget_id__ -- Retrieves a specific budget object with the given ID.
```javascript
{
    "id": String
    "name": String
    "amount": Number
}
```
#### UPDATE
* __PUT /budgets/:budget_id__ -- Updates a specific budget object with the given ID. 
```javascript
{
    "id": String
    "name": String
    "amount": Number
}
```
#### DELETE
* __DELETE /budgets/:budget_id__ -- Deletes a specific budget object with the given ID. 
```javascript
Empty
```
#### *Code snippet*
```javascript
// Endpoint to handle requests to a specific budget resource by ID
budgetsRouter
  .route('/budgets/:budgetId')
  // Get a specific budget by ID
  .get((req, res) => res.send(getFromDatabasebyId('budgets', req.params.budgetId)))
  // Update an existing budget in the list
  .put((req, res) => res.send(updateInstanceInDatabase('budgets', req.params.budgetId, req.body)))
  // Delete a specific budget from the list
  .delete((req, res) => res.sendStatus(deleteFromDatabasebyId('budgets', req.params.budgetId)? 204 : 500));
```

### `/expenses`
#### CREATE
- __POST /expenses__ -- Creates a new expense object.
```javascript
{
    "id": String, //use ulid
    "dt_create": String //isoString DateTime 
    "dt_update": String //isoString DateTime 
    "dt_value": String //isoString DateTime 
    "amount": Number
    "description": String
    "budget_id": String
}
```
#### READ
- __GET /expenses__ -- Retrieves a list of all expense objects.
```javascript
[{
    "id": String, //use ulid
    "dt_create": String //isoString ISO 8601 
    "dt_update": String //isoString ISO 8601 
    "dt_value": String //isoString ISO 8601 
    "amount": Number
    "description": String
    "budget_id": String
},
...
{
    "id": String, //use ulid
    "dt_create": String //isoString ISO 8601 
    "dt_update": String //isoString ISO 8601 
    "dt_value": String //isoString ISO 8601 
    "amount": Number
    "description": String
    "budget_id": String
}]
```
#### *Code snippet*
```javascript
// Endpoint to handle requests for the expenses
expensesRouter
  .route('/expenses')
  // Get all expenses
  .get((req, res) => res.send(getAllFromDatabase('expenses')))
  // Create a new expense
  .post((req, res) => res.send(addToDatabase('expenses', req.body)));
```

### `/expenses/{expense_id}`
#### READ
- __GET /expenses/:id__ -- Retrieves a specific expense object with the given ID.
```javascript
{
    "id": String, //use ulid
    "dt_create": String //isoString ISO 8601 
    "dt_update": String //isoString ISO 8601
    "dt_value": String //isoString ISO 8601  
    "amount": Number
    "description": String
    "budget_id": String
}
```
#### UPDATE
- __PUT /expenses/:id__ -- Updates a specific expense object with the given ID.
```javascript
{
    "id": String, //use ulid
    "dt_create": String //isoString ISO 8601 
    "dt_update": String //isoString ISO 8601
    "dt_value": String //isoString ISO 8601  
    "amount": Number
    "description": String
    "budget_id": String
}
```
#### DELETE
- __DELETE /expenses/:id__ -- Deletes a specific expense object with the given ID.
```javascript
Empty
```
#### *Code snippet*
```javascript
// Endpoint to handle requests to a specific expense resource by ID
expensesRouter
  .route('expenses/:expenseId')
  // Get a specific expense by ID
  .get((req, res) => res.send(getFromDatabasebyId('expenses', req.params.expenseId)))
  // Update an existing expense in the list
  .put((req, res) => res.send(updateInstanceInDatabase('expenses', req.params.expenseId, req.body)))
  // Delete a specific expense from the list
  .delete((req, res) => res.sendStatus(deleteFromDatabasebyId('expenses', req.params.expenseId)? 204 : 500));
```
### `/revenues`
#### CREATE
- __POST /revenues__ -- Creates a new revenue object.
```javascript
{
    "id": String, //use ulid
    "dt_create": String //isoString ISO 8601 
    "dt_update": String //isoString ISO 8601
    "dt_value": String //isoString ISO 8601  
    "amount": Number
    "description": String
}
```
#### READ
- __GET /revenues__ -- Retrieves a list of all revenue objects.
```javascript
{
    "id": String, //use ulid
    "dt_create": String //isoString ISO 8601 
    "dt_update": String //isoString ISO 8601
    "dt_value": String //isoString ISO 8601  
    "amount": Number
    "description": String
}
```
#### *Code snippet*
```javascript
// Endpoint to handle requests for the revenues
revenuesRouter
  .route('/revenues')
  // Get all revenues
  .get((req, res) => res.send(getAllFromDatabase('revenues')))
  // Create a new revenue
  .post((req, res) => res.send(addToDatabase('revenues', req.body)));
```
### `/revenues/{revenue_id}`
#### READ
- __GET /revenues/:id__ -- Retrieves a specific revenue object with the given ID.
```javascript
{
    "id": String, //use ulid
    "dt_create": String //isoString ISO 8601 
    "dt_update": String //isoString ISO 8601
    "dt_value": String //isoString ISO 8601  
    "amount": Number
    "description": String
}
```
#### UPDATE
- __PUT /revenues/:id__ -- Updates a specific revenue object with the given ID.
```javascript
{
    "id": String, //use ulid
    "dt_create": String //isoString ISO 8601 
    "dt_update": String //isoString ISO 8601
    "dt_value": String //isoString ISO 8601  
    "amount": Number
    "description": String
}
```
#### DELETE
- __DELETE /revenues/:id__ -- Deletes a specific revenue object with the given ID.
```javascript
Empty
```
#### *Code snippet*
```javascript
// Endpoint to handle requests to a specific revenue resource by ID
revenuesRouter
  .route('/:revenueId')
  // Get a specific revenue by ID
  .get((req, res) => res.send(getFromDatabasebyId('revenues', req.params.revenueId)))
  // Update an existing revenue in the list
  .put((req, res) => res.send(updateInstanceInDatabase('revenues', req.params.revenueId, req.body)))
  // Delete a specific revenue from the list
  .delete((req, res) => res.sendStatus(deleteFromDatabasebyId('revenues', req.params.revenueId)? 204 : 500));
```
### `/balance`
#### READ
- __GET /balance__: Retrieves a list of all budget objects.
- The endpoint does not require any parameters in the request body?

##### Request
```javascript
Empty
```
##### Reponse
```javascript
[{
    "id": String,
    "name": String,
    "budgeted_amount": Number,
    "expenses": Number,
    "balance": Number
},
...
{
    "id": String,
    "name": String,
    "budgeted_amount": Number,
    "expenses": Number,
    "balance": Number
}]
```
#### *Code snippet*
```javascript
// Endpoint to handle requests for the balances
balancesRouter
  .route('/balances')
  // Get all revenues
  .get((req, res) => res.send(getAllFromDatabase('balances')))
```
### `/budgets/balance/YYYY/MM`
#### READ
- __GET /budgets/balance/YYYY/MM__ -- Retrieves a specific list of all objects representing the balance information for each budget category in the specified month and year.
- The endpoint does not require any parameters in the request body?

##### Request
```javascript
Empty
```
##### Reponse
```javascript
[{
    "id": String,
    "name": String,
    "budgeted_amount": Number,
    "expenses": Number,
    "balance": Number
},
...
{
    "id": String,
    "name": String,
    "budgeted_amount": Number,
    "expenses": Number,
    "balance": Number
}]
```

#### *Code snippet*
```javascript
// Endpoint to handle requests for the balances
balancesRouter
  .route('/balances')
  // Get all revenues
  .get((req, res) => res.send(getAllFromDatabase('balances')))
```

### `/budgets/{budget_id}/balance/YYYY/MM`
- __GET /budgets/:id/balance/YYYY/MM__ -- Retrieves the balance information for a specific budget category identified by ID for the specified month and year.
- The endpoint does not require any parameters in the request body?

#### READ
##### Request
```javascript
Empty
```
##### Reponse
```javascript
{
    "id": String,
    "name": String,
    "budgeted_amount": Number,
    "expenses": Number,
    "balance": Number
}
```
#### *Code snippet*
```javascript
// Endpoint to handle requests for the balances
balancesRouter
  .route('/balances/:year/:month')
  // Get all revenues for a specific month and year
  .get((req, res) => {
    const year = req.params.year;
    const month = req.params.month;
    res.send(getAllFromDatabase('balances', year, month));
  });
```

## Models
### Budget
```javascript
{
    "id": BudgetId,
    "name": String,
    "amount": Number
}
```

### Expenses
```javascript
{
    "id": ExpenseId,
    "dt_create": Date 
    "dt_update": Date
    "dt_value": Date
    "amount": Number,
    "description": String
    "budget_id": BudgetId
}
```

### Revenues
```javascript
{
    "id": RevenueId,
    "dt_create": Date, 
    "dt_update": Date, 
    "dt_value": Date,
    "amount": Number,
    "description": String
}
```

### Models Examples
```javascript
{
    budgets: [{
        "id": "some id - rent",
        "name": "rent",
        "amount": 100
    },
    {
        "id": "some other id - groceries",
        "name": "groceries",
        "amount": 50
    }],
    expenses: [{
        "id": "1423423512312",
        "dt_create": "2022-10-30T" 
        "dt_update": "2022-10-30T" 
        "dt_value": "2022-10-30T" 
        "amount": "100",
        "description": "rent 2022/10"
        "budget_id": "some id - rent"
    },
    {
        "id": "1423423512312",
        "dt_create": "2022-09-30T" 
        "dt_update": "2022-09-30T"
        "dt_value": "2022-09-30T" 
        "amount": "100",
        "description": "rent 2022/09"
        "budget_id": "some id - rent"
    }],
    revenues: [
    {
        "id": "1423423512312",
        "dt_create": "2022-09-30T" 
        "dt_update": "2022-09-30T"  
        "dt_value": "2022-09-30T" 
        "amount": "180",
        "description": "salary 2022/09"
    },
    {
        "id": "142315846312", 
        "dt_create": "2022-08-30T"  
        "dt_update": "2022-08-30T" 
        "dt_value": "2022-08-30T"  
        "amount": "180",
        "description": "salary 2022/08"
    }
    ]
}
```

## Tests with ava
- `/budgets`
	- returns an array of all objects
	- creates an object and returns it
- `/budgets/{budget_id}`
	- returns a single object of budget
	- updates the correct object and returns it
	- returns a 404 error with a called a non-numeric ID
    - called with invalid ID and returns a 404 error
- `/expenses`
	- returns an array of all objects
	- creates an object and returns it
- `/expenses/{expense_id}`
	- returns a single object of budget
	- updates the correct object and returns it
	- returns a 404 error with a called a non-numeric ID
    - called with invalid ID and returns a 404 error
- `/revenues`
	- returns an array of all objects
	- creates an object and returns it
- `/expenses/{revenue_id}`
	- returns a single object of budget
	- updates the correct object and returns it
	- returns a 404 error with a called a non-numeric ID
    - called with invalid ID and returns a 404 error
- `/balance`
	- returns an array of all objects
- `/budgets/balance/YYYY/MM`
	- returns an array of all objects
    - called with invalid YEAR or MONTH and returns a 404 error
- `/budgets/{budget_id}/balance/YYYY/MM`
	- returns a single object of budget
	- returns a 404 error with a called a non-numeric ID
    - called with invalid ID and returns a 404 error
    - called with invalid YEAR or MONTH and returns a 404 error