const axios = require('axios'); // Axios library for making HTTP requests
const Crypto = require('../models/crypto'); // Mongoose model for interacting with the Crypto collection in MongoDB
const dotenv = require('dotenv'); // Import dotenv to load environment variables

// Function to fetch cryptocurrency data from the CoinGecko API and store it in the database
const fetchCryptoData = async () => {
  // Define the cryptocurrencies to fetch data for, using their CoinGecko IDs
  const coins = ['bitcoin', 'matic-network', 'ethereum'];

  try {
    // Make a GET request to the CoinGecko API to fetch the current price, market cap, and 24-hour change
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets', // Updated API endpoint
      {
        params: {
            vs_currency: 'usd', // Fetch data in USD
            ids: coins.join(','), // Join the coin IDs into a comma-separated string
            x_cg_demo_api_key: process.env.COINGECKO_API_KEY, 
          },
       
      }
    );

    // Iterate over each cryptocurrency in the list
    for (const coin of coins) {
      const data = response.data.find(coinData => coinData.id === coin); // Find the data for the current coin

      // Save the fetched data into the database
      if (data) {
        await Crypto.create({
          coin, // The coin ID (e.g., "bitcoin")
          price: data.current_price, // The current price in USD
          marketCap: data.market_cap, // The market cap in USD
          change24h: data.price_change_percentage_24h, // The 24-hour price change percentage
        });
      }
    }

    // Log a success message after all coins have been processed
    console.log('Crypto data updated successfully.');
  } catch (err) {
    // Log an error message if the API call or database operation fails
    console.error('Error fetching data from CoinGecko:', err.message);
  }
};

// Export the function to be used in other parts of the application
module.exports = fetchCryptoData;
