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