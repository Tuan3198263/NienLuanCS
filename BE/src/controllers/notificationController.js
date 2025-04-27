// controllers/notificationController.js
const Notification = require('../models/notification');

const sendNotification = async (userId, message) => {
  try {
    // Tạo thông báo mới
    const notification = new Notification({
      userId,
      message,
      isRead: false,
    });

    // Lưu thông báo vào cơ sở dữ liệu
    await notification.save();

    console.log('Thông báo đã được gửi:', message);
  } catch (error) {
    console.error('Lỗi khi gửi thông báo:', error);
  }
};

// Hàm lấy danh sách thông báo theo userId
const getNotifications = async (userId) => {
  try {
    // Lấy tất cả thông báo của userId từ cơ sở dữ liệu và sắp xếp theo ngày tạo (mới nhất trước)
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    return notifications;
  } catch (error) {
    console.error('Lỗi khi lấy thông báo:', error);
    throw error;
  }
};

module.exports = { sendNotification, getNotifications };
