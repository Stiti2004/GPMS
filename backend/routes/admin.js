const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(verifyToken);
router.use(authorizeRoles('admin'));

// Get admin homepage
//router.get('/home', adminController.getHomePage);

// Manage panchayat members
router.get('/panchayat-members', adminController.getAllPanchayatMembers);
router.post('/panchayat-members', adminController.addPanchayatMember);
router.put('/panchayat-members/:id', adminController.updatePanchayatMember);
router.delete('/panchayat-members/:id', adminController.deletePanchayatMember);

// Manage welfare schemes
router.get('/schemes', adminController.getAllSchemes);
router.post('/schemes', adminController.addScheme);
router.put('/schemes/:id', adminController.updateScheme);
router.delete('/schemes/:id', adminController.deleteScheme);

// Get specific scheme type
router.post('/schemes/education', adminController.addEducationScheme);
router.post('/schemes/agriculture', adminController.addAgricultureScheme);
router.post('/schemes/healthcare', adminController.addHealthcareScheme);

// Manage system assets
router.get('/assets', adminController.getAllAssets);
router.post('/assets', adminController.addAsset);
router.put('/assets/:id', adminController.updateAsset);
router.delete('/assets/:id', adminController.deleteAsset);

// Get system statistics
router.get('/statistics/census', adminController.getCensusStatistics);
router.get('/statistics/income', adminController.getIncomeStatistics);
router.get('/statistics/expenditure', adminController.getExpenditureStatistics);
router.get('/statistics/environmental', adminController.getEnvironmentalStatistics);

module.exports = router;