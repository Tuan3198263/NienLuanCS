const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');


router.get('/companies', companyController.getCompanies);
// Route lấy thông tin công ty theo ID
router.get('/company/:id', companyController.getCompanyById);

// Route thêm công ty mới
router.post('/company', companyController.createCompany);

// Route xóa công ty theo companyId
router.delete('/company/:id', companyController.deleteCompanyById);


// Route cập nhật công ty theo companyId
router.put('/:id', companyController.updateCompanyById);

module.exports = router;
