const fs = require('fs'); // Importing the fs library

/*FUNCTIONS*/

// Function to retrieve all data from the JSON database 
const getAllFromDatabase = (key) => {
    try {
      // Read the data from the file and parse it as JSON
      const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
  
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


/* MODULE EXPORTS*/

module.exports = {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
  };