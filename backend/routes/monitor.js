// const express = require('express');
// const { viewProfile, modifyCitizenData } = require('../controllers/monitorController');
// const { protect } = require('../middleware/authMiddleware'); // Protect routes
// const router = express.Router();


// // <-- Monitor should only get the statistics of the  -->
// // Protect routes with authentication
// router.get('/profile', protect, viewProfile);
// router.put('/modifyCitizenData', protect, modifyCitizenData);

// module.exports = router;

const express = require('express');
const { viewProfile, modifyCitizenData } = require('../controllers/monitorController'); // Import controller functions
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

// 🔍 Debugging: Check if functions are correctly imported
console.log("viewProfile:", viewProfile);
console.log("modifyCitizenData:", modifyCitizenData);

router.get('/profile', verifyToken, viewProfile);
router.put('/modifyCitizenData', verifyToken, modifyCitizenData);


module.exports = router;

