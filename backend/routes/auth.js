const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login route
router.post('/login', authController.login);

// Route to get the registration page based on role
router.get('/register/:role', (req, res) => {
    const role = req.params.role;

    if (role === 'panchayatMember') {
        // Ask whether the user is already a registered citizen
        return res.json({
            message: 'Are you already registered as a citizen?',
            options: {
                yes: '/register/panchayatMember/member',
                no: '/register/panchayatMember/citizen'
            }
        });
    }

    switch (role) {
        case 'citizen':
            return authController.registerCitizen(req, res);
        case 'admin':
            return authController.registerAdmin(req, res);
        case 'monitor':
            return authController.registerMonitor(req, res);
        default:
            return res.status(400).json({ message: 'Invalid role specified' });
    }
});

// Panchayat Member Registration Flow
router.post('/register/panchayatMember/citizen', authController.registerPanchayatMemberAsCitizen);
router.post('/register/panchayatMember/member', authController.registerPanchayatMember);

/*
router.get('/register', authController.getRegisterPage);
router.post('/register/citizen', authController.registerCitizen);
router.post('/register/panchayatMember/citizen', authController.registerPanchayatMemberAsCitizen);
router.post('/register/panchayatMember/member', authController.registerPanchayatMember);
router.post('/register/admin', authController.registerAdmin);
router.post('/register/monitor', authController.registerMonitor);
*/

module.exports = router;