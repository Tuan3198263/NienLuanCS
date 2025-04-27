const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware'); // Middleware xác thực token JWT
const { sendNotification, getNotifications } = require('../controllers/notificationController');
const User = require('../models/user'); // Giả sử đây là model của User

// Route gửi thông báo
router.post('/send', async (req, res) => {
  const { userId, message } = req.body;

  try {
    // Kiểm tra xem userId có tồn tại trong collection User không
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    // Nếu userId tồn tại, tiếp tục gửi thông báo
    await sendNotification(userId, message);
    res.status(200).json({ message: 'Thông báo đã được gửi thành công' });
  } catch (error) {
    console.error('Lỗi khi gửi thông báo:', error);
    res.status(500).json({ message: 'Lỗi khi gửi thông báo' });
  }
});



// Route lấy danh sách thông báo của người dùng đã đăng nhập
router.get('/user/notifications', authenticateToken, async (req, res) => {
  const userId = req.user.id; // Lấy userId từ token đã giải mã

  try {
    const notifications = await getNotifications(userId);

    if (notifications.length === 0) {
      return res.status(404).json({ message: 'Không có thông báo' });
    }

    res.status(200).json({ notifications });
  } catch (error) {
    console.error('Lỗi khi lấy thông báo:', error);
    res.status(500).json({ message: 'Lỗi khi lấy thông báo' });
  }
});


module.exports = router;
