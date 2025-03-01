const { getUserById } = require('../models/userModel');
const { getCitizenInfo, modifyCitizenInfo } = require('../models/citizenModel');

// View user profile
const viewProfile = async (req, res) => {
    try {
        const user = await getUserById(req.user.userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modify citizen data (for Panchayat employees)
const modifyCitizenData = async (req, res) => {
    try {
        const { citizenId, newData } = req.body;
        const updatedCitizen = await modifyCitizenInfo(citizenId, newData);
        res.status(200).json(updatedCitizen);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { viewProfile, modifyCitizenData };
