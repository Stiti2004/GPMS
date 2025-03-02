const express = require('express');
const router = express.Router();
const panchayatController = require('../controllers/panchayatController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// Apply auth middleware to all routes
router.use(verifyToken);
router.use(authorizeRoles('panchayatMember'));

// Get panchayat member homepage
router.get('/home', panchayatController.getHomePage);

// Get panchayat member profile
router.get('/profile', panchayatController.getProfile);

// Manage citizens
router.get('/citizens', panchayatController.getAllCitizens);
router.get('/citizens/:id', panchayatController.getCitizenById);
router.post('/citizens', panchayatController.addCitizen);
router.put('/citizens/:id', panchayatController.updateCitizen);

// Manage households
router.get('/households', panchayatController.getAllHouseholds);
router.post('/households', panchayatController.addHousehold);
router.put('/households/:id', panchayatController.updateHousehold);

// Manage land records
router.get('/land-records', panchayatController.getAllLandRecords);
router.post('/land-records', panchayatController.addLandRecord);
router.put('/land-records/:id', panchayatController.updateLandRecord);

// Manage certificates
router.get('/certificates', panchayatController.getAllCertificates);
router.post('/certificates/approve/:id', panchayatController.approveCertificate);
router.post('/certificates/reject/:id', panchayatController.rejectCertificate);

// Manage taxes
router.get('/taxes', panchayatController.getAllTaxes);
router.post('/taxes', panchayatController.addTax);
router.put('/taxes/:id', panchayatController.updateTax);

// Manage welfare schemes
router.get('/schemes', panchayatController.getAllSchemes);
router.get('/schemes/:id/enrollments', panchayatController.getSchemeEnrollments);
router.post('/schemes/:id/approve/:enrollmentId', panchayatController.approveEnrollment);
router.post('/schemes/:id/reject/:enrollmentId', panchayatController.rejectEnrollment);

module.exports = router;