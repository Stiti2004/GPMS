const pool = require('../db');

// Get all village data
const getVillageData = async () => {
    const query = 'SELECT * FROM villages';  // Assuming you have a "villages" table
    try {
        const res = await pool.query(query);
        return res.rows;  // Return the list of villages
    } catch (err) {
        console.error('Error fetching village data:', err);
        throw new Error('Could not retrieve village data');
    }
};

// Modify village data (only accessible by Panchayat employees)
const modifyVillageData = async (newData) => {
    const { villageId, newAddress, newIncome } = newData;
    const query = `
        UPDATE villages
        SET address = $1, income = $2
        WHERE village_id = $3
        RETURNING *;
    `;
    const values = [newAddress, newIncome, villageId];

    try {
        const res = await pool.query(query, values);
        return res.rows[0];  // Return the updated village data
    } catch (err) {
        console.error('Error updating village data:', err);
        throw new Error('Could not update village data');
    }
};

module.exports = {
    getVillageData,
    modifyVillageData
};
