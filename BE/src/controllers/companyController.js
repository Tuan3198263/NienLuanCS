const Company = require('../models/company');

// Lấy công ty theo companyId
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findOne({ companyId: req.params.id }); // Tìm công ty theo companyId
    if (!company) {
      return res.status(404).json({ message: 'Company not found' }); // Nếu không tìm thấy công ty
    }
    res.status(200).json(company); // Trả về công ty nếu tìm thấy
  } catch (err) {
    res.status(500).json({ message: 'Error fetching company', error: err }); // Xử lý lỗi
  }
};

const Job = require('../models/job'); // Giả sử bạn đã khai báo model Job

exports.deleteCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    // Kiểm tra xem có công việc nào liên kết với công ty này hay không
    const jobs = await Job.find({ jobCompanyId: companyId });

    if (jobs.length > 0) {
      return res.status(400).json({ message: 'Không thể xóa công ty đang có đăng tin tuyển dụng' });
    }

    // Tìm công ty và xóa
    const company = await Company.findOneAndDelete({ companyId: companyId });

    // Kiểm tra xem công ty có tồn tại hay không
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting company', error: err });
  }
};


// Thêm công ty mới
exports.createCompany = async (req, res) => {
  try {
    // Kiểm tra xem companyId đã tồn tại chưa
    const existingCompany = await Company.findOne({ companyId: req.body.companyId });

    // Nếu companyId đã tồn tại, trả về lỗi
    if (existingCompany) {
      return res.status(400).json({ message: 'Company ID already exists' });
    }

    // Tạo giá trị ngẫu nhiên cho jobOpening và followCount
    const jobOpening = Math.floor(Math.random() * (6 - 2 + 1)) + 2;  // Random từ 2 đến 6
    const followCount = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;  // Random từ 100 đến 1000
    const image = "https://www.vietnamworks.com/_next/image?url=https%3A%2F%2Fimages02.vietnamworks.com%2Fcompanyprofile%2Fbanner-default-company.png&w=1920&q=75"

    // Thêm các giá trị ngẫu nhiên vào đối tượng công ty
    const newCompany = new Company({
      ...req.body,
      companyJobsOpening: jobOpening,  // Gán giá trị random cho jobOpening
      companyFollowersCount: followCount,  // Gán giá trị random cho followCount
      companyImage: image
    });

    const company = await newCompany.save();  // Lưu công ty vào MongoDB

    res.status(201).json(company);  // Trả về công ty vừa tạo
  } catch (err) {
    res.status(500).json({ message: 'Error creating company', error: err });
  }
};


// Cập nhật công ty theo companyId
exports.updateCompanyById = async (req, res) => {
  try {
    // Tìm và cập nhật công ty dựa trên companyId
    const company = await Company.findOneAndUpdate(
      { companyId: req.params.id },  // Điều kiện tìm công ty theo companyId
      req.body,                      // Dữ liệu cập nhật từ request body
      { new: true, runValidators: true } // Trả về tài liệu sau khi cập nhật
    );

    // Kiểm tra xem công ty có tồn tại hay không
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json(company);  // Trả về công ty đã cập nhật
  } catch (err) {
    res.status(500).json({ message: 'Error updating company', error: err });
  }
};

// Lấy danh sách tất cả công ty
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();  // Lấy tất cả công ty
    res.status(200).json(companies);         // Trả về danh sách công ty
  } catch (err) {
    res.status(500).json({ message: 'Error fetching companies', error: err }); // Xử lý lỗi
  }
};
