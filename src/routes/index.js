const express = require('express'); // Importing the Express framework
const { getStats } = require('../controllers/statsController'); // Importing the stats controller
const { getDeviation } = require('../controllers/deviationController'); // Importing the deviation controller

const router = express.Router(); // Creating a new instance of the Express router

// Route to handle requests for cryptocurrency stats
// Maps to the '/api/stats' endpoint
// Calls the getStats function from the statsController
router.get('/stats', getStats);

// Route to handle requests for calculating standard deviation
// Maps to the '/api/deviation' endpoint
// Calls the getDeviation function from the deviationController
router.get('/deviation', getDeviation);

// Exporting the router so it can be used in the main application
module.exports = router;

