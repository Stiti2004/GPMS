const express = require('express');
const router = express.Router();
const citizenController = require('../controllers/citizenController');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(verifyToken);

// Get citizen homepage
router.get('/home', authorizeRoles('citizen'), citizenController.getHomePage);

// Get citizen profile
router.get('/profile', authorizeRoles('citizen'), citizenController.getProfile);

// Get land records for the citizen
router.get('/land-records', authorizeRoles('citizen'), citizenController.getLandRecords);

// Get welfare schemes for the citizen
router.get('/schemes', authorizeRoles('citizen'), citizenController.getSchemes);

// Apply for a scheme
router.post('/schemes/apply/:schemeId', authorizeRoles('citizen'), citizenController.applyForScheme);

// Get certificates for the citizen
router.get('/certificates', authorizeRoles('citizen'), citizenController.getCertificates);

// Apply for a certificate
router.post('/certificates/apply', authorizeRoles('citizen'), citizenController.applyForCertificate);

// Get tax information for the citizen
router.get('/taxes', authorizeRoles('citizen'), citizenController.getTaxes);

// Get vaccination records for the citizen
router.get('/vaccinations', authorizeRoles('citizen'), citizenController.getVaccinations);

module.exports = router;