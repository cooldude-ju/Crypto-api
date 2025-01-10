const mongoose = require('mongoose'); // Importing Mongoose library for interacting with MongoDB

// Define the schema for storing cryptocurrency data
const cryptoSchema = new mongoose.Schema({
  // The name or identifier of the cryptocurrency (e.g., 'bitcoin', 'matic-network', 'ethereum')
  coin: { 
    type: String, 
    required: true // This field is mandatory
  }, 
  // The price of the cryptocurrency in USD
  price: { 
    type: Number, 
    required: true // This field is mandatory
  }, 
  // The market capitalization of the cryptocurrency in USD
  marketCap: { 
    type: Number, 
    required: true // This field is mandatory
  }, 
  // The 24-hour price change percentage of the cryptocurrency
  change24h: { 
    type: Number, 
    required: true // This field is mandatory
  }, 
  // The timestamp when the data was recorded, defaulting to the current date and time
  timestamp: { 
    type: Date, 
    default: Date.now // Automatically sets to the current date and time
  },
});

// Export the schema as a Mongoose model named 'Crypto'
// This allows CRUD operations on the 'Crypto' collection in the database
module.exports = mongoose.model('Crypto', cryptoSchema);

