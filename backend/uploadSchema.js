require('dotenv').config(); // Load environment variables from .env file
const fs = require('fs');
const { Pool } = require('pg');

// Create PostgreSQL pool connection
const pool = new Pool({
    user: process.env.DATABASE_USER,      // From .env
    host: process.env.DATABASE_HOST,      // From .env
    database: process.env.DATABASE_NAME,  // From .env
    password: process.env.DATABASE_PASSWORD, // From .env
    port: process.env.DATABASE_PORT,      // From .env
});

// Function to read and execute the schema file
const uploadSchema = async () => {
    try {
        // Read the SQL schema from the file
        const schema = fs.readFileSync('schema.sql', 'utf8');
        
        // Split the schema by semicolon to execute each statement
        const queries = schema.split(';').map(query => query.trim()).filter(query => query.length > 0);
        
        // Execute each query sequentially
        for (let query of queries) {
            console.log(`Executing: ${query}`);
            await pool.query(query);
        }

        console.log('Schema uploaded successfully!');
    } catch (err) {
        console.error('Error executing schema:', err.message);
    } finally {
        pool.end();  // Close the connection
    }
};

// Run the function
uploadSchema();
