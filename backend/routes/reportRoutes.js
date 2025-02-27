const express = require('express');
const { generateReports } = require('../controllers/reportController');
const { protect, authorizeRole } = require('../middleware/authMiddleware');
const router = express.Router();

// Protect route and allow access only for government monitors
router.get('/generateReport', protect, authorizeRole('government_monitor'), generateReports);

module.exports = router;
