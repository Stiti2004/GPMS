const { modifyVillageData, getVillageData } = require('../models/panchayatModel');

// Get village data
const getVillageInfo = async (req, res) => {
    try {
        const villageData = await getVillageData();
        res.status(200).json(villageData);  // Return village data
    } catch (error) {
        res.status(500).json({ message: 'Error fetching village data', error: error.message });
    }
};

// Modify village data (e.g., for Panchayat employees)
const modifyVillageDataController = async (req, res) => {
    const { newData } = req.body;
    try {
        const updatedData = await modifyVillageData(newData);
        res.status(200).json(updatedData);  // Return updated village data
    } catch (error) {
        res.status(500).json({ message: 'Error modifying village data', error: error.message });
    }
};

module.exports = { getVillageInfo, modifyVillageDataController };
