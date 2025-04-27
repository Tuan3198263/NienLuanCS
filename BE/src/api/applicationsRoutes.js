// api/applicationsRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const applicationController = require('../controllers/applicationController');


// Định nghĩa route ứng tuyển công việc và sử dụng middleware
router.post('/apply', authMiddleware, applicationController.applyForJob);

// Route lấy danh sách ứng tuyển của người dùng
router.get('/user', authMiddleware, applicationController.getAppliedJobs);

// Route lấy danh sách tất cả đơn ứng tuyển
router.get('/applicationslist',  applicationController.getAllApplications);

// API để chấp nhận đơn ứng tuyển
router.patch('/accept/:applicationId', applicationController.acceptApplication);

// api từ chối đơn

router.patch('/reject/:applicationId', applicationController.rejectApplication);
// api xóa đơn
router.delete('/delete/:applicationId', applicationController.deleteApplication);

// API kiểm tra ứng tuyển
router.post('/has-applied',authMiddleware, applicationController.hasAppliedForJob);






module.exports = router;