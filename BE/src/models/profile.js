// src/models/Profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }, // Email là key
    birthday: { type: Date,  }, // Ngày sinh
    gender: { type: String, },   // Trường giới tính
    jobtitle: {type: String,}, //Chức danh
    level: { type: String },                    // Trường cấp bậc
    companyfield: {type: String,}, // Ngành nghề
    careerfield: {type: String,}, // lĩnh vực
    experience: { type: Number },               // Trường số năm kinh nghiệm
    degree: { type: String },                   // Trường bằng cấp
    address: { type: String },                  // Trường địa chỉ
    avatar: { type: String },                   // Đường dẫn đến ảnh đại diện (avatar)
    cv: {type: String},                         // Đường dẫn tới cv(ảnh cv)
    workplace: {type: String},                  // nơi làm việc
    salary: {type: Number},                     // Lương mong muốn
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true } // Liên kết với User
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
