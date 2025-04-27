const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware để kiểm tra token

// file cập nhật form profile
// Cập nhật profile
router.put('/', authMiddleware, profileController.updateProfile);


// Route cập nhật avatar
router.put('/avatar', authMiddleware, profileController.updateAvatar);

router.put('/cv', authMiddleware, profileController.updateCV )

router.put('/workplace-salary', authMiddleware, profileController.updateWorkplaceAndSalary)

module.exports = router;
