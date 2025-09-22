// Import required libraries
const { Pool } = require('pg');
const dotenv = require('dotenv').config();

// Create database connection pool
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

pool.on('error', (err) => {
});

pool.on('connect', () => {
});

module.exports = { pool };