// src/controller/userController.js
const User = require('../models/user');
const Profile = require('../models/profile');

exports.getUserProfile = async (req, res) => {
    try {
        const email = req.user.email; // Giả sử bạn có middleware để lấy email từ token
        const user = await User.findOne({ email });
        const profile = await Profile.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }

        res.status(200).json({ 
            firstname: user.firstName, 
            lastname: user.lastName, 
            email: user.email,
            jobtitle: profile ? profile.jobtitle: 'Chưa cập nhật',
            level: profile ? profile.level : 'Chưa cập nhật',
            experience: profile ? profile.experience : 'Chưa cập nhật',
            address: profile ? profile.address : 'Chưa cập nhật',
            degree: profile ? profile.degree: 'Chưa cập nhật',
            phone: user.phone ,
            avatar: profile.avatar,
            cv: profile.cv,
            workplace: profile ? profile.workplace: 'Chưa cập nhật',
            salary: profile ? profile.salary: 'Chưa cập nhật'
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin người dùng', error });
    }
};
