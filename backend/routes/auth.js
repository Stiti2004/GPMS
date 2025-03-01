const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login route
router.post('/login', authController.login);

// Register routes
router.get('/register', authController.getRegisterPage);
router.post('/register/citizen', authController.registerCitizen);
router.post('/register/panchayatMember/citizen', authController.registerPanchayatMemberAsCitizen);
router.post('/register/panchayatMember/member', authController.registerPanchayatMember);
router.post('/register/admin', authController.registerAdmin);
router.post('/register/monitor', authController.registerMonitor);

module.exports = router;