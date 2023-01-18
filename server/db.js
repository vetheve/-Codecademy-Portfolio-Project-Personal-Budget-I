const fs = require('fs'); // Importing the fs library

/*FUNCTIONS*/

// Function to retrieve all data from the JSON database 
const getAllFromDatabase = (key) => {
    try {
      // Read the data from the file and parse it as JSON
      const data = JSON.parse(fs.readFileSync('./server/data.json', 'utf8'));
  
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
        // Read and parse the data from the JSON file
        const data = JSON.parse(fs.readFileSync('./server/data.json', 'utf8'));
        
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

/* ULID*/

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