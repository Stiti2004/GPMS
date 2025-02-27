const express = require('express');
const { registerCitizenController, getCitizenProfileController } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // Protect routes with JWT

const router = express.Router();

// Route to register a new citizen
router.post('/register', registerCitizenController);

// Route to get citizen profile (protected route)
router.get('/profile/:id', protect, getCitizenProfileController);

module.exports = router;
