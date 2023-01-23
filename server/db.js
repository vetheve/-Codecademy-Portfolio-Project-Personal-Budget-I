const fs = require('fs'); // Importing the fs library
const jsonData = JSON.parse(fs.readFileSync('./server/data.json', 'utf8')); // Read the data from the file and parse it as JSON

/*FILTERING FUNCTIONS*/

// Function to retrieve all data from the JSON database 
const getAllFromDatabase = (key) => {
    try {
      // Check if the data is empty
      if (!jsonData) {
        return null;
      }
      // Return the data for the specified key
      return jsonData[key];
    } catch (err) {
      // Log the error message to the console
      console.error(err);
      // Return null if there is an error
      return null;
    }
  };

// Function to retrieve a specific data from the JSON database 
const getFromDatabaseById = (key, id, data = jsonData) => {
    try {
        // Check if the data for the specified key is empty
        if (!data[key]) {
            return null;
        }
        // Search for the object with the specified ID and return it
        return data[key].find(element => element.id === id);
    } catch (err) {
        // Log any errors that occur
        console.error(err.message);
        // Return null if there is an error
        return null;
    }
};


// Function to retrieve a specific data from the JSON database 
const getFromDatabaseByItem = (key, item, value, data = jsonData) => {
    try {
        // Check if the data for the specified key is empty
        if (!data[key]) {
            return null;
        }
        // Search for the object with the specified ID and return it
        return data[key].find(element => element[item] === value);
    } catch (err) {
        // Log any errors that occur
        console.error(err.message);
        // Return null if there is an error
        return null;
    }
};

//This function filters records from the database by category
const getFromDatabaseByCategory = (value, data = jsonData) => {
    try {
        // Filter the budgets array by the specified category
        const budgets = data.budgets.filter(budget => budget['category'] === value);
        // Filter the expenses array by the specified category
        const expenses = data.expenses.filter(expense => expense['category'] === value);
        // Create an object with the filtered budgets and expenses
        const result = {
            budgets: budgets,
            expenses: expenses
        }
        // Return the result
        return result;
    } catch (err) {
        // Log any errors that occur
        console.error(err.message);
        // Return null if there is an error
        return null;
    }
};

//This function filters revenues & expenses records from the database by month and year
const filterNetBalanceByMonth = (month, year, data = jsonData) => {
    try {
        // Filter the budgets array by the provided month and year
        const revenues = data.revenues.filter(revenue => {
              let dateObject = new Date(revenue.dt_value);
              return dateObject.getMonth() + 1 === month && dateObject.getFullYear() === year;
          });
        // Filter the expenses array by the provided month and year
        const expenses = data.expenses.filter(expense => {
              let dateObject = new Date(expense.dt_value);
              return dateObject.getMonth() + 1 === month && dateObject.getFullYear() === year;
          });
        // Create an object with the filtered budgets and expenses
        const result = {
            revenues: revenues,
            expenses: expenses
        }
        // Return the result
        return result;
    } catch (err) {
        // Log any errors that occur
        console.error(err.message);
        // Return null if there is an error
        return null;
    }
};

//This function filters revenues & expenses records from the database by  year
const filterNetBalanceByYear = (year, data = jsonData) => {
    try {
        // Filter the budgets array by the provided year
        const revenues = data.revenues.filter(revenue => {
              let dateObject = new Date(revenue.dt_value);
              return dateObject.getFullYear() === year;
          });
        // Filter the expenses array by the provided year
        const expenses = data.expenses.filter(expense => {
              let dateObject = new Date(expense.dt_value);
              return dateObject.getFullYear() === year;
          });
        // Create an object with the filtered budgets and expenses
        const result = {
            revenues: revenues,
            expenses: expenses
        }
        // Return the result
        return result;
    } catch (err) {
        // Log any errors that occur
        console.error(err.message);
        // Return null if there is an error
        return null;
    }
};


//This function filters budgets & expenses records from the database by month and year
const filterBudgetBalanceByMonth = (month, year, data = jsonData) => {
    try {
        // Filter the budgets array by the provided month and year
        const budgets = data.budgets.filter(budget => {
              let dateObject = new Date(budget.dt_value);
              return dateObject.getMonth() + 1 === month && dateObject.getFullYear() === year;
          });
        // Filter the expenses array by the provided month and year
        const expenses = data.expenses.filter(expense => {
              let dateObject = new Date(expense.dt_value);
              return dateObject.getMonth() + 1 === month && dateObject.getFullYear() === year;
          });
        // Create an object with the filtered budgets and expenses
        const result = {
            budgets: budgets,
            expenses: expenses
        }
        // Return the result
        return result;
    } catch (err) {
        // Log any errors that occur
        console.error(err.message);
        // Return null if there is an error
        return null;
    }
};

//This function filters budgets & expenses records from the database by year
const filterBudgetBalanceByYear = (year, data = jsonData) => {
    try {
        // Filter the budgets array by the provided year
        const budgets = data.budgets.filter(budget => {
              let dateObject = new Date(budget.dt_value);
              return dateObject.getFullYear() === year;
          });
        // Filter the expenses array by the provided year
        const expenses = data.expenses.filter(expense => {
              let dateObject = new Date(expense.dt_value);
              return dateObject.getFullYear() === year;
          });
        // Create an object with the filtered budgets and expenses
        const result = {
            budgets: budgets,
            expenses: expenses
        }
        // Return the result
        return result;
    } catch (err) {
        // Log any errors that occur
        console.error(err.message);
        // Return null if there is an error
        return null;
    }
};

/*========================================================================================*/

/*POST FUNCTIONS*/

// This function pushes a new budget object in the jsonData
const addBudgetToDatabase = (id, category, amount, data = jsonData) => {
    try {
        // Generates timestamp and converts it to ISO string format
        const timestamp = Date.now();
        const isoString = new Date(timestamp).toISOString();

        // Creates budget object with provided information and default timestamp and ID values
        const object = {
            id: id,
            dt_create: isoString,
            dt_update: isoString,
            dt_value: isoString,
            category: category,
            amount: amount
        };

        // Pushes the budget object to the jsonData
        return data['budgets'].push(object);
    } catch (err) {
        // Log any errors that occur
        console.error(err.message);
        // Return null if there is an error
        return null;
    }
};

// This function pushes a new expense object in the jsonData
const addExpenseToDatabase = (amount, description, budget_id, category, data = jsonData) => {
    try {
        // Generates timestamp and converts it to ISO string format
        const timestamp = Date.now();
        const isoString = new Date(timestamp).toISOString();

        // Generates unique ID for the expenses object
        const newId = generateULID();

        // Creates  expense object with provided information and default timestamp and ID values
        const object = {
            id: newId,
            dt_create: isoString,
            dt_update: isoString,
            dt_value: isoString,
            category: category,
            amount: amount,
            description: description,
            budget_id: budget_id,
            category: category
        };

        // Pushes the expenses object to the jsonData
        return data['expenses'].push(object);
    } catch (err) {
        // Log any errors that occur
        console.error(err.message);
        // Return null if there is an error
        return null;
    }
};

// This function pushes a new revenue object in the jsonData
const addRevenueToDatabase = (amount, description, data = jsonData) => {
    try {
        // Generates timestamp and converts it to ISO string format
        const timestamp = Date.now();
        const isoString = new Date(timestamp).toISOString();

        // Generates unique ID for the revenue object
        const newId = generateULID();

        // Creates revenue object with provided information and default timestamp and ID values
        const object = {
            id: newId,
            dt_create: isoString,
            dt_update: isoString,
            dt_value: isoString,
            amount: amount,
            description: description
        };

        // Pushes the revenue object to the specified key in the jsonData object
    return data['revenues'].push(object);
    } catch (err) {
        // Log any errors that occur
        console.error(err.message);
        // Return null if there is an error
        return null;
    }
};

/*========================================================================================*/

/*DELETE FUNCTION*/

// This function delete an object in the jsonData
const deleteFromDatabasebyId = (key, id, data = jsonData) => {
    try {
        // Check if the data for the specified key is empty
        if (!data[key]) {
            return null;
        }
        // Search for the object with the specified ID and delete it
        data[key] = data[key].filter(element => element.id !== id);
        fs.writeFile('./data.json', JSON.stringify(data), (err) => {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
        });
    } catch (err) {
        // Log any errors that occur
        console.error(err.message);
    }
};

/*========================================================================================*/

/*CALCULATING FUNCTIONS*/

// Function to calculate the total of any array passed as a parameter
const calculateTotal = (arr) => {
    // Use reduce method to iterate over the array and sum up the amounts
    return arr.reduce((acc, curr) => {
        // Add the current amount to the accumulator
        return acc + parseFloat(curr.amount)
    }, 0);
}

// Function to calculate the "Net Financial Balance" by calling the helper function 'calculateTotal'
const calculateNetBalance = (data = jsonData) => {
    try {
        // Calculate the total revenues by passing the revenues array to the helper function
        const totalRevenues = calculateTotal(data.revenues);
        // Calculate the total expenses by passing the expenses array to the helper function
        const totalExpenses = calculateTotal(data.expenses);
        // Calculate the "Net Financial Balance" by subtracting the total expenses from the total revenues
        const netBalance = totalRevenues - totalExpenses;
        // Return the Net Balance
        return {"Net balance" : netBalance};
    } catch (err) {
        // Log any errors that occur
        console.error(err.message);
        // Return null if there is an error
        return null;
    }
};

// Function to calculate the "Budgeted Amount Balance" by calling the helper function 'calculateTotal'
const calculateBudgetBalance = (data = jsonData) => {
    try {
        // Calculate the total budgets by passing the revenues array to the helper function
        const totalBudgets = calculateTotal(data.budgets);
        // Calculate the total expenses by passing the expenses array to the helper function
        const totalExpenses = calculateTotal(data.expenses);
        // Calculate the "Budgeted Amount Balance" by subtracting the total expenses from the total budgets
        const budgetBalance = totalBudgets - totalExpenses;
        // Return the Budget Balance
        return {"Budget balance" : budgetBalance};
    } catch (err) {
        // Log any errors that occur
        console.error(err.message);
        // Return null if there is an error
        return null;
    }
};

/*========================================================================================*/

/*ULID FUNCTION*/

// This code imports the ULID library, which is used to generate unique, lexicographically sortable identifiers.
const ulid = require('ulid');

// This function uses the ulid library to generate a new ULID and returns it.
function generateULID() {
    return ulid.ulid();
}

/*========================================================================================*/

/* MODULE EXPORTS*/

 
module.exports = {
    getAllFromDatabase,
    getFromDatabaseById,
    getFromDatabaseByItem,
    getFromDatabaseByCategory,
    filterNetBalanceByMonth,
    filterNetBalanceByYear,
    filterBudgetBalanceByMonth,
    filterBudgetBalanceByYear,
    addBudgetToDatabase,
    addExpenseToDatabase,
    addRevenueToDatabase,
    calculateNetBalance,
    calculateBudgetBalance,
    generateULID
  };