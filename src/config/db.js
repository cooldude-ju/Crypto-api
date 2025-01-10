const mongoose = require('mongoose'); // Import Mongoose, an ODM (Object Data Modeling) library for MongoDB

// Function to establish a connection to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log('MongoDB connected'); // Log a success message if the connection is established
  } catch (err) {
    // Log an error message if the connection fails
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit the process with a failure code (1)
  }
};

// Export the function for use in other parts of the application
module.exports = connectDB;

