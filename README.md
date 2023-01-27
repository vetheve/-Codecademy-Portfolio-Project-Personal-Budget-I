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
- Postman (in my case Thunder Client)

## Envelopes Budgeting

- __Housing__: This category includes expenses such as rent or mortgage payments, property taxes, and home insurance.
- __Transportation__: This category includes expenses related to getting around, such as car payments, gas, and public transportation costs.
- __Utilities__: This category includes expenses for services such as electricity, water, gas, internet, and cable.
- __Food__: This category includes expenses for groceries, dining out, and other food-related costs.
- __Personal__: This category includes expenses for personal items such as clothing, entertainment, and hobbies.

## Balances

- __Budgeted Amount Balance__: Refers to the remaining amount of the budgeted amount after expenses have been taken into account. It represents the difference between the budgeted amount and the total expenses for a specific category or budget. It is an indicator of how well you are sticking to your budget.

$$
Budgeted Amount Balance = Budgeted Amount - Total Expenses
$$

- __Net Financial Balance__: refers to the overall financial status, it is the difference between the total revenues and the total expenses. It represents the overall financial position. It is an indicator of the overall financial health.

$$
Net Financial Balance = Total Revenues - Total Expenses
$$

> In summary, __Budgeted Amount Balance__ is a measure of how well you are sticking to your budget, while __Net Financial Balance__ is a measure of the overall financial health.

## Endpoints
### `/budgets` (CRUD)

- __GET__ `/budgets`: Retrieves all budgets and sends them as a response. If not found, sends error message.
- __POST__ `/budgets`: Attempts to add a new budget and sends the added budget as response. If fails, sends error message.
- __GET__ `/budgets/:id`: Retrieves a specific budget by ID and sends it as a response. If not found, sends error message.
- __PUT__ `/budgets/:id`: Attempts to update a specific budget by ID and sends the updated budget as response. If fails, sends error message.
- __DELETE__ `/budgets/:id`: Attempts to delete a specific budget by ID and sends a successful deletion message. If fails, sends error message.

### `/expenses` (CRUD)

- __GET__ `/expenses`: Retrieves all expenses from the database and sends them as a response. If not found, sends error message.
- __POST__ `/expenses`: Attempts to add a new expense to the database and sends the added expense as response. If fails, sends error message.
- __GET__ `/expenses/:id`: Attempts to retrieve a specific expense by ID and sends it as a response. If not found, sends error message.
- __PUT__ `/expenses/:id`: Attempts to update an existing expense by ID and sends it as a response. If not found, sends error message.
- __DELETE__ `/expenses/:id`: Attempts to delete a specific expense by ID and sends it as a response. If not found, sends error message.

### `/revenues` (CRUD)

- __GET__ `/revenues`: Retrieves all revenues and sends them as a response. If not found, sends error message.
- __POST__ `/revenues`: Attempts to add a new revenue and sends the added revenue as response. If fails, sends error message.
- __GET__ `/revenues/:id`: Retrieves a specific revenue by ID and sends it as a response. If not found, sends error message.
- __PUT__ `/revenues/:id`: Attempts to update a specific revenue by ID and sends the updated revenue as response. If fails, sends error message.
- __DELETE__ `/revenues/:id`: Attempts to delete a specific revenue by ID and sends a successful deletion message. If fails, sends error message.

### `/netbalance` (Read-Only)

- __GET__ `/netbalance`: Retrieves the total net balance.
- __GET__ `/netbalance/:year/:month` : Retrieves the total net balance for a specific year and month by filtering the net balance data by month and year.
- __GET__ `/netbalance/:year` : Retrieves the total net balance for a specific year by filtering the net balance data by year.

All the endpoints will return a JSON object containing the net balance data if it is found, otherwise it will return a 404 error with a message indicating that the net balance data was not found.

### `/budgetbalance` (Read-Only)

- __GET__ `/budgetbalance` : Retrieves the total budget balance without any filtering.
- __GET__ `/budgetbalance/` :year/:month : Retrieves the total budget balance for a specific year and month by filtering the budget balance data by month and year.
- __GET__ `/budgetbalance/:year` : Retrieves the total budget balance for a specific year by filtering the budget balance data by year.
- __GET__ `/budgetbalance/:category` : Retrieves the total budget balance for a specific category by filtering the budget balance data by category.
- __GET__ `/budgetbalance/:year/:category` : Retrieves the total budget balance for a specific category and year by filtering the budget balance data by year and category.
- __GET__ `/budgetbalance/:year/:month/:category` : Retrieves the total budget balance for a specific category, year and month by filtering the budget balance data by year, month and category.

All the endpoints will return a JSON object containing the budget balance data if it is found, otherwise it will return a 404 error with a message indicating that the budget balance data was not found.


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