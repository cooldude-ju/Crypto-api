const Crypto = require('../models/crypto'); // Import the Crypto model to interact with the database

// Controller function to handle requests for cryptocurrency statistics
const getStats = async (req, res) => {
  // Extract the `coin` query parameter from the request
  const { coin } = req.query;

  // Validate that the `coin` parameter is provided
  if (!coin) {
    return res.status(400).json({ error: 'Coin is required.' }); // Respond with a 400 Bad Request error if missing
  }

  try {
    // Query the database for the latest entry of the specified coin, sorted by timestamp in descending order
    const data = await Crypto.findOne({ coin }).sort({ timestamp: -1 });

   
// If no data is found for the specified coin, return a 404 Not Found error
if (!data) {
  return res.status(404).json({ error: 'Data not found for the specified coin.' });}

    // Respond with the relevant cryptocurrency data in JSON format
    res.json({
      price: data.price, // Current price in USD
      marketCap: data.marketCap, // Market capitalization in USD
      "24hChange": data.change24h, // 24-hour price change percentage
    });
  } catch (err) {
    // Log the error and respond with a 500 Internal Server Error status if something goes wrong
    console.error('Error fetching stats:', err.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Export the function to be used in routes
module.exports = { getStats };
