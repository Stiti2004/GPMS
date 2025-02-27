const express = require('express');
const { getCitizenInfo } = require('../controllers/citizenController');
const router = express.Router();

// Get citizen information by ID
router.get('/:citizenId', getCitizenInfo);

module.exports = router;
