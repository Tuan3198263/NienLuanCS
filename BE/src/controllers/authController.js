// src/controller/authController.js
const checkAuth = (req, res) => {
    res.status(200).json({ 
        message: 'Bạn đã đăng nhập.', 
        user: req.user // Trả về thông tin người dùng
    });
};


module.exports = {
    checkAuth, // Đảm bảo export hàm
};