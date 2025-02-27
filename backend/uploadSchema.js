require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// Create PostgreSQL pool connection
const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
});

// Function to read and execute the schema file
const uploadSchema = async () => {
    const schemaPath = path.resolve(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    const queries = schema.split(';').map(query => query.trim()).filter(query => query.length > 0);

    const client = await pool.connect();
    try {
        await client.query('BEGIN');  // Start a transaction

        for (let query of queries) {
            console.log(`Executing: ${query}`);
            await client.query(query);
        }

        await client.query('COMMIT');  // Commit the transaction
        console.log('Schema uploaded successfully!');
    } catch (err) {
        await client.query('ROLLBACK');  // Rollback in case of error
        console.error('Error executing schema:', err);
        console.error('Error Stack:', err.stack);
    } finally {
        client.release();  // Release the client back to the pool
    }
};

// Run the function to upload the schema
uploadSchema();
