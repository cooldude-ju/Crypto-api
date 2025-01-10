const axios = require('axios'); // Axios library for making HTTP requests
const Crypto = require('../models/crypto'); // Mongoose model for interacting with the Crypto collection in MongoDB

// Function to fetch cryptocurrency data from the CoinGecko API and store it in the database
const fetchCryptoData = async () => {
  // Define the cryptocurrencies to fetch data for, using their CoinGecko IDs
  const coins = ['bitcoin', 'matic-network', 'ethereum'];

  try {
    // Make a GET request to the CoinGecko API to fetch the current price, market cap, and 24-hour change
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price`,
      {
        params: {
          ids: coins.join(','), // Join the coin IDs into a comma-separated string
          vs_currencies: 'usd', // Fetch data in USD
          include_market_cap: true, // Include market cap information
          include_24hr_change: true, // Include 24-hour change information
        },
      }
    );

    // Iterate over each cryptocurrency in the list
    for (const coin of coins) {
      const data = response.data[coin]; // Extract the data for the current coin

      // Save the fetched data into the database
      await Crypto.create({
        coin, // The coin ID (e.g., "bitcoin")
        price: data.usd, // The current price in USD
        marketCap: data.usd_market_cap, // The market cap in USD
        change24h: data.usd_24h_change, // The 24-hour price change percentage
      });
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
