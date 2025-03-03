const { Pool } = require('pg');
require('dotenv').config();

// Debugging logs (REMOVE after debugging)
console.log("🟢 DATABASE CONFIGURATION:");
console.log("USER:", process.env.DATABASE_USER);
console.log("HOST:", process.env.DATABASE_HOST);
console.log("PORT:", process.env.DATABASE_PORT);
console.log("NAME:", process.env.DATABASE_NAME);


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};