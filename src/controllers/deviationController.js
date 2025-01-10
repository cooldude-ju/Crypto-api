const Crypto = require('../models/crypto'); // Import the Crypto model to interact with the database

// Helper function to calculate the standard deviation of an array of numbers
const calculateStandardDeviation = (numbers) => {
  // Calculate the mean of the numbers
  const mean = numbers.reduce((sum, val) => sum + val, 0) / numbers.length;

  // Calculate the variance (average of squared differences from the mean)
  const variance =
    numbers.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
    numbers.length;

  // Return the square root of the variance (standard deviation)
  return Math.sqrt(variance);
};

// Controller function to handle requests for standard deviation
const getDeviation = async (req, res) => {
  // Extract the `coin` query parameter from the request
  const { coin } = req.query;

  // Validate that the `coin` parameter is provided
  if (!coin) {
    return res.status(400).json({ error: 'Coin is required.' }); // Respond with a 400 Bad Request error if missing
  }

  try {
    // Fetch the most recent 100 records for the specified coin from the database
    const records = await Crypto.find({ coin })
      .sort({ timestamp: -1 }) // Sort records by timestamp in descending order
      .limit(100); // Limit the query to the latest 100 records

    // If no records are found, return a 404 Not Found error
    if (records.length === 0) {
      return res
        .status(404)
        .json({ error: 'Not enough data to calculate deviation.' });
    }

    // Extract the prices from the records
    const prices = records.map((record) => record.price);

    // Calculate the standard deviation of the prices
    const deviation = calculateStandardDeviation(prices);

    // Respond with the calculated deviation, rounded to 2 decimal places
    res.json({ deviation: deviation.toFixed(2) });
  } catch (err) {
    // Log the error and respond with a 500 Internal Server Error status if something goes wrong
    console.error('Error calculating deviation:', err.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Export the function to be used in routes
module.exports = { getDeviation };

