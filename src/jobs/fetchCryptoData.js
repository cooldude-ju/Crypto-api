const axios = require('axios'); // Axios library for making HTTP requests
const Crypto = require('../models/crypto'); // Mongoose model for interacting with the Crypto collection in MongoDB
require('dotenv').config(); // Import dotenv to handle environment variables

// Function to fetch cryptocurrency data from the CoinGecko API and store it in the database
const fetchCryptoData = async () => {
  const coins = ['bitcoin', 'matic-network', 'ethereum']; // Cryptocurrencies to fetch data for

  try {
    // Make a GET request to the CoinGecko API to fetch the current price, market cap, and 24-hour change
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price`, 
      {
        params: {
          ids: coins.join(','), // List of coins to fetch, joined by commas
          vs_currencies: 'usd', // Convert to USD
          include_market_cap: true, // Include market cap data
          include_24hr_change: true, // Include 24-hour price change
        },
        headers: {
          'User-Agent': 'CryptoTrackerApp', // Optional: Add a user-agent for better request handling
          'Authorization': `Bearer ${process.env.COINGECKO_API_KEY}` // Securely using the API key from environment variables
        }
      }
    );

    // Process and store data for each coin in the database
    for (const coin of coins) {
      const data = response.data[coin]; // Get the data for the current coin

      // Save the data into MongoDB
      await Crypto.create({
        coin, // Coin ID (e.g., 'bitcoin')
        price: data.usd, // Current price in USD
        marketCap: data.usd_market_cap, // Market capitalization in USD
        change24h: data.usd_24h_change, // 24-hour price change percentage
      });
    }

    // Log success message when data is successfully saved to the database
    console.log('Crypto data updated successfully.');
  } catch (err) {
    // Log any error if the request or database operation fails
    console.error('Error fetching data from CoinGecko:', err.message);
  }
};

// Export the function to be used elsewhere in the application
module.exports = fetchCryptoData;
