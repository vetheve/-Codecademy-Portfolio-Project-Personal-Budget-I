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
const getFromDatabaseById = (key, id) => {
    try {
        // Check if the data for the specified key is empty
        if (!jsonData[key]) {
            return null;
        }
        // Search for the object with the specified ID and return it
        return jsonData[key].find(element => element.id === id);
    } catch (err) {
        // Log any errors that occur
        console.error(err.message);
        // Return null if there is an error
        return null;
    }
};

//This function filters records from the database by item and the value
const getFromDatabaseByItem = (item, value) => {
    try {
        // Filter the budgets array by the specified item and value
        const budgets = jsonData.budgets.filter(budget => budget[item] === value);
        // Filter the expenses array by the specified item and value
        const expenses = jsonData.expenses.filter(expense => expense[item] === value);
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

//This function filters records from the database by month and year
const filterKeyRecordsByMonth = (month, year) => {
    try {
        // Filter the budgets array by the provided month and year
        const budgets = jsonData.budgets.filter(budget => {
              let dateObject = new Date(budget.dt_value);
              return dateObject.getMonth() + 1 === month && dateObject.getFullYear() === year;
          });
        // Filter the expenses array by the provided month and year
        const expenses = jsonData.expenses.filter(expense => {
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

//This function filters records from the database by  year
const filterKeyRecordsByYear = (year) => {
    try {
        // Filter the budgets array by the provided year
        const budgets = jsonData.budgets.filter(budget => {
              let dateObject = new Date(budget.dt_value);
              return dateObject.getFullYear() === year;
          });
        // Filter the expenses array by the provided year
        const expenses = jsonData.expenses.filter(expense => {
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
        return netBalance;
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
        return budgetBalance;
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
    generateULID
  };