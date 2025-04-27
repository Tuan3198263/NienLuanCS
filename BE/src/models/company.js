const mongoose = require('mongoose');

// Định nghĩa schema cho công ty
const companySchema = new mongoose.Schema({
  companyId: { type: String, required: true },
  companyName: { type: String, required: true },
  companyImage: { type: String, required: false },          // Thêm trường image
  companyJobsOpening: { type: Number, required: false },    // Thêm trường jobsOpening
  companyFollowersCount: { type: Number, required: false },  // Thêm trường followersCount
  companyLogo: { type: String, required: true },
  companyAddress: { type: String, required: true },
  companyWebsite: { type: String, required: true },
  companyDescription: { type: String, required: true },
 
});

// Tạo model từ schema
const Company = mongoose.model('Company', companySchema);

module.exports = Company;
