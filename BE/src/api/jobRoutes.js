// /src/api/jobRoutes.js
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');  // Import jobController

// Route lấy tất cả công việc
router.get('/jobs', jobController.getJobs);



//route lấy cong viec theo bo loc
router.get('/getJobFilter', jobController.getJobFilter);

// Định nghĩa route cho tìm kiếm công việc theo tiêu đề
router.get('/jobs/search', jobController.searchJobByTitle);

// Route lấy một công việc theo ID
router.get('/jobs/:jobID', jobController.getJobById);

// Route thêm công việc mới
router.post('/jobs', jobController.createJob);

// Xóa công việc theo jobID
router.delete('/jobs/:jobID', jobController.deleteJob);

// Đảm bảo rằng route này đã được khai báo đúng
router.get('/jobs/company/:companyId', jobController.getJobsByCompany);

// Route cập nhật công việc
router.put('/jobs/:jobID', jobController.updateJob);




module.exports = router;
