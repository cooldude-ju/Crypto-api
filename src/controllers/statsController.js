const axios = require('axios');

// Controller function to handle requests for cryptocurrency statistics
const getStats = async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: 'Coin is required.' });
  }

  try {
    // Add headers and an API key if needed
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: coin, // The coin requested (e.g., 'bitcoin')
        vs_currencies: 'usd',
        include_market_cap: true,
        include_24hr_change: true,
      },
      headers: {
        'User-Agent': 'CryptoTrackerApp', // Add a user-agent to mimic a browser request
      }
    });

    // Check if the requested coin data is available in the response
    if (!response.data[coin]) {
      return res.status(404).json({ error: `Data not found for ${coin}.` });
    }

    // Respond with the relevant cryptocurrency data in JSON format
    res.json({
      price: response.data[coin].usd,
      marketCap: response.data[coin].usd_market_cap,
      "24hChange": response.data[coin].usd_24h_change,
    });
  } catch (err) {
    console.error('Error fetching stats:', err.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = { getStats };

