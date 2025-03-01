const express = require('express');
const { viewProfile, modifyCitizenData } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // Protect routes
const router = express.Router();

// Protect routes with authentication
router.get('/profile', protect, viewProfile);
router.put('/modifyCitizenData', protect, modifyCitizenData);

module.exports = router;
