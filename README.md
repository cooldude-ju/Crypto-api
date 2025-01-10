
# Crypto Tracker

Crypto Tracker is a Node.js application that fetches cryptocurrency data (Bitcoin, Ethereum, and Matic) using the CoinGecko API. It stores the data in a MongoDB database and provides APIs to retrieve the latest data and calculate price deviations.

## Features

1. **Background Job**: 
   - Fetches the latest price, market cap, and 24-hour change for cryptocurrencies.
   - Runs every 2 hours using `node-cron`.

2. **APIs**:
   - `/stats`: Retrieve the latest data for a specific cryptocurrency.
   - `/deviation`: Calculate the standard deviation of the price for the last 100 records.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/cooldude-ju/Crypto-api
   cd crypto-tracker

    Install dependencies:

npm install

Create a .env file in the root directory:

MONGO_URI=<your-mongodb-uri>
PORT=5000

Start the server:

    npm start

    The server will run on http://localhost:5000.

API Endpoints
1. Fetch Latest Crypto Data

Endpoint: /api/stats

Method: GET
Query Parameters:

    coin (string): One of bitcoin, matic-network, or ethereum.

Response:

{
  "price": 40000,
  "marketCap": 800000000,
  "24hChange": 3.4
}

2. Fetch Price Deviation

Endpoint: /api/deviation

Method: GET
Query Parameters:

    coin (string): One of bitcoin, matic-network, or ethereum.

Response:

{
  "deviation": 4082.48
}

Background Job

A cron job runs every 2 hours to fetch the latest cryptocurrency data from the CoinGecko API.
Deployment

You can deploy this application using platforms like:

    MongoDB Atlas: For a cloud database.
    Heroku, Vercel, or AWS: For deploying the Node.js server.

Built With

    Node.js
    Express
    Mongoose
    CoinGecko API
    node-cron

