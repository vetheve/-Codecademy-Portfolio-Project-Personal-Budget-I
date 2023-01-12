// Function to retrieve all data from the JSON database 
const getAllFromDatabase = (key) => {
    // Parse the data from the JSON file
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'))

    // Return the data for the specified key, or null if the key does not exist
    return data[key] || null;
}
