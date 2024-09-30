
// src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true }, // Trường họ
    lastName: { type: String, required: true },  // Trường tên
    phone: { type: String, required: true },     // Trường số điện thoại
    email: { type: String, required: true, unique: true }, // Trường email
    password: { type: String, required: true }   // Trường mật khẩu
});


// Thêm phương thức comparePassword
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
