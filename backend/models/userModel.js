const pool = require('../db');

// Create a new user (e.g., for registration)
const createUser = async (username, password, role) => {
    const query = `
        INSERT INTO users (username, password, role)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const values = [username, password, role];

    try {
        const res = await pool.query(query, values);
        return res.rows[0];  // Return the newly created user
    } catch (err) {
        console.error('Error creating user:', err);
        throw new Error('User creation failed');
    }
};

// Get a user by username (for login)
const getUserByUsername = async (username) => {
    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username];

    try {
        const res = await pool.query(query, values);
        return res.rows[0];  // Return the user if found
    } catch (err) {
        console.error('Error fetching user:', err);
        throw new Error('User not found');
    }
};

// Get a user by ID (for profile page or other user info)
const getUserById = async (userId) => {
    const query = 'SELECT * FROM users WHERE user_id = $1';
    const values = [userId];

    try {
        const res = await pool.query(query, values);
        return res.rows[0];  // Return the user if found
    } catch (err) {
        console.error('Error fetching user by ID:', err);
        throw new Error('User not found');
    }
};

module.exports = {
    createUser,
    getUserByUsername,
    getUserById
};
