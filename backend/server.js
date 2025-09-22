// Import required libraries
const express = require('express');
const cors = require('cors'); 
const path = require('path')

// Import database connection
const { pool } = require('./db.js');
// Import and process .env file
const dotenv = require('dotenv').config();

// Create express app instance
const app = express();

// Mount static path
app.use(express.static(path.join(__dirname, "public")));
// Mount cors middleware
app.use(cors()); 
// Mount json processing middleware
app.use(express.json());

// Event handler to unknown errors
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    console.error('Stack trace:', error.stack);
});
// Event handler to unknown rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise);
    console.error('Reason:', reason);
});

// Register routes
const fixturesRouter = require('./routes/fixturesRoutes');
app.use('/api/fixtures', fixturesRouter);

// Start app listening on PORT
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => { console.log(`Server listening on PORT: ${PORT}`)
});

module.exports = { pool };