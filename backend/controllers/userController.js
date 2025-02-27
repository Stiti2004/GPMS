const { registerCitizen, getCitizenById } = require('../models/userModel');

// Register a new citizen (creating a new user)
const registerCitizenController = async (req, res) => {
    const { username, password, name, gender, dob, household_id, educational_qualification, role } = req.body;
    try {
        const newCitizen = await registerCitizen({
            username, password, name, gender, dob, household_id, educational_qualification, role
        });
        res.status(201).json({ citizen_id: newCitizen.citizen_id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get citizen details by ID (used for profile)
const getCitizenProfileController = async (req, res) => {
    const citizenId = req.params.id;
    try {
        const citizen = await getCitizenById(citizenId);
        res.status(200).json(citizen);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { registerCitizenController, getCitizenProfileController };
