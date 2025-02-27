const express = require('express');
const { getVillageInfo, modifyVillageDataController } = require('../controllers/panchayatController');
const { protect, authorizeRole } = require('../middleware/authMiddleware'); // Protect routes

const router = express.Router();

// Get village information (for Panchayat employees)
router.get('/village', protect, authorizeRole('panchayat_employee'), getVillageInfo);

// Modify village data (for Panchayat employees)
router.put('/modifyVillage', protect, authorizeRole('panchayat_employee'), modifyVillageDataController);

module.exports = router;
