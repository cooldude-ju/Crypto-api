const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file

const fetchCryptoData = async () => {
  // Check if API key is loaded correctly
  if (!process.env.COINGECKO_API_KEY) {
    console.error("API key is missing in the environment variables.");
    return;
  }

  // Define the cryptocurrencies to fetch data for, using their CoinGecko IDs
  const coins = ['bitcoin', 'matic-network', 'ethereum'];

  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets', // Updated API endpoint
      {
        params: {
          vs_currency: 'usd', // Fetch data in USD
          ids: coins.join(','), // Join the coin IDs into a comma-separated string
          x_cg_demo_api_key: process.env.COINGECKO_API_KEY, // API Key from environment variables
        },
      }
    );

    for (const coin of coins) {
      const data = response.data.find(coinData => coinData.id === coin); // Find the data for the current coin
      if (data) {
        await Crypto.create({
          coin,
          price: data.current_price,
          marketCap: data.market_cap,
          change24h: data.price_change_percentage_24h,
        });
      }
    }
    console.log('Crypto data updated successfully.');
  } catch (err) {
    console.error('Error fetching data from CoinGecko:', err.message);
  }
};
module.exports = fetchCryptoData;
