require('dotenv').config();  // Load environment variables from .env file
const { Pool } = require('pg');

// Create a new pool connection using environment variables
const pool = new Pool({
    user: process.env.DATABASE_USER,        // From .env
    host: process.env.DATABASE_HOST,        // From .env
    database: process.env.DATABASE_NAME,    // From .env
    password: process.env.DATABASE_PASSWORD, // From .env
    port: process.env.DATABASE_PORT,        // From .env
});

module.exports = pool;
