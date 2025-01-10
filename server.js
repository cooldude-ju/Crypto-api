// Import the Express application defined in app.js
const app = require('./app');

// Retrieve the server port from environment variables
const PORT = process.env.PORT;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  // Log a message indicating that the server is running and the URL to access it
  console.log(`Server running on http://localhost:${PORT}`);
});
