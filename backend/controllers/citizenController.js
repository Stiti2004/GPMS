const { getCitizenById } = require('../models/citizenModel');

// Get citizen information by ID
const getCitizenInfo = async (req, res) => {
    const { citizenId } = req.params;  // Get citizenId from URL params
    try {
        const citizen = await getCitizenById(citizenId);
        if (!citizen) {
            return res.status(404).json({ message: 'Citizen not found' });
        }
        res.status(200).json(citizen);  // Return citizen data
    } catch (error) {
        res.status(500).json({ message: 'Error fetching citizen data', error: error.message });
    }
};

module.exports = { getCitizenInfo };
