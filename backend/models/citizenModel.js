const pool = require('../db');

// Get a citizen by ID
const getCitizenById = async (citizenId) => {
    const query = 'SELECT * FROM citizens WHERE citizen_id = $1';
    const values = [citizenId];

    try {
        const res = await pool.query(query, values);
        return res.rows[0];  // Return the citizen if found
    } catch (err) {
        console.error('Error fetching citizen by ID:', err);
        throw new Error('Citizen not found');
    }
};

// Register a new citizen (add a new citizen to the database)
const registerCitizen = async (citizenData) => {
    const { citizenId, name, gender, dob, householdId, education, role } = citizenData;
    const query = `
        INSERT INTO citizens (citizen_id, name, gender, dob, household_id, educational_qualification, role)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `;
    const values = [citizenId, name, gender, dob, householdId, education, role];

    try {
        const res = await pool.query(query, values);
        return res.rows[0];  // Return the newly registered citizen
    } catch (err) {
        console.error('Error registering citizen:', err);
        throw new Error('Citizen registration failed');
    }
};

// Modify citizen information (only accessible by Panchayat employees)
const modifyCitizenInfo = async (citizenId, newData) => {
    const { name, gender, dob, householdId, education, role } = newData;
    const query = `
        UPDATE citizens
        SET name = $1, gender = $2, dob = $3, household_id = $4, educational_qualification = $5, role = $6
        WHERE citizen_id = $7
        RETURNING *;
    `;
    const values = [name, gender, dob, householdId, education, role, citizenId];

    try {
        const res = await pool.query(query, values);
        return res.rows[0];  // Return the updated citizen info
    } catch (err) {
        console.error('Error modifying citizen info:', err);
        throw new Error('Citizen information update failed');
    }
};

module.exports = {
    getCitizenById,
    registerCitizen,
    modifyCitizenInfo
};
