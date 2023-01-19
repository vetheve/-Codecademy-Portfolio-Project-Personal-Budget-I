const fs = require('fs'); // Importing the fs library
const data = JSON.parse(fs.readFileSync('./server/data.json', 'utf8')); // Read the data from the file and parse it as JSON

/*FILTERING FUNCTIONS*/

// Function to retrieve all data from the JSON database 
const getAllFromDatabase = (key) => {
    try {
      // Check if the data is empty
      if (!data) {
        return null;
      }
      // Return the data for the specified key
      return data[key];
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

//This function filters records from the database by month and year
const filterRecordsByMonth = (key, month, year) => {
  try {
      // Retrieve all records from the database
      const records = getAllFromDatabase(key);
      if (records) {
          // Filter records by the provided month and year
          const filteredRecords = records.filter(record => {
              let dateObject = new Date(record.dt_value);
              return dateObject.getMonth() + 1 === month && dateObject.getFullYear() === year;
          });
          // Return the filtered records
          return filteredRecords;
      } else {
          console.log("No records found");
          return null;
      }
  } catch (error) {
      console.log(error);
      return null;
  }
};

// This function filters records from the database by year
const filterRecordsByYear = (key, year) => {
  try {
      // Retrieve all records from the database
      const records = getAllFromDatabase(key);
      if (records) {
          // Filter records by the provided year
          const filteredRecords = records.filter(record => {
              let dateObject = new Date(record.dt_value);
              return dateObject.getFullYear() === year;
          });
          // Return the filtered records
          return filteredRecords;
      } else {
          console.log("No records found");
          return null;
      }
  } catch (error) {
      console.log(error);
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
const calculateNetBalance = () => {
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
const calculateBudgetBalance = () => {
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