const axios = require('axios'); // Axios library for making HTTP requests
const Crypto = require('../models/crypto'); // Mongoose model for interacting with the Crypto collection in MongoDB
const dotenv = require('dotenv'); // Import dotenv to load environment variables

// Controller function to handle requests for cryptocurrency statistics
const getStats = async (req, res) => {
  // Extract the `coin` query parameter from the request
  const { coin } = req.query;

  // Validate that the `coin` parameter is provided
  if (!coin) {
    return res.status(400).json({ error: 'Coin is required.' }); // Respond with a 400 Bad Request error if missing
  }

  try {
    // Make a GET request to the CoinGecko API to fetch the current price, market cap, and 24-hour change
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets', // Updated API endpoint
      {
        params: {
          vs_currency: 'usd', // Fetch data in USD
          ids: coin, // Fetch data for the specified coin
          
          x_cg_demo_api_key: process.env.COINGECKO_API_KEY,
          },
        },
        
      
    );

    // Check if data is available for the requested coin
    if (response.data.length === 0) {
      return res.status(404).json({ error: 'Data not found for the specified coin.' });
    }

    // Extract the data for the requested coin
    const data = response.data[0];

    // Respond with the relevant cryptocurrency data in JSON format
    res.json({
      price: data.current_price, // Current price in USD
      marketCap: data.market_cap, // Market capitalization in USD
      "24hChange": data.price_change_percentage_24h, // 24-hour price change percentage
    });
  } catch (err) {
    // Log the error and respond with a 500 Internal Server Error status if something goes wrong
    console.error('Error fetching stats:', err.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Export the function to be used in routes
module.exports = { getStats };
