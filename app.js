const express = require('express'); // Import Express framework for building APIs
const dotenv = require('dotenv'); // Import dotenv to load environment variables
const connectDB = require('./src/config/db'); // Import the database connection function
const routes = require('./src/routes'); // Import application routes
const cron = require('node-cron'); // Import node-cron for scheduling background jobs
const fetchCryptoData = require('./src/jobs/fetchCryptoData'); // Import the function to fetch crypto data

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

// Fetch cryptocurrency data once when the server starts
fetchCryptoData();


const app = express(); // Initialize an Express application

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define API routes
app.use('/api', routes);

// Define a root route for the API
app.get('/', (req, res) => {
  res.send('Welcome to the Crypto API!'); // Send a friendly welcome message
});

// Export the app for use in other modules (e.g., starting the server)
module.exports = app;
