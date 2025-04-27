// src/controller/favoriteController.js
const Favorite = require('../models/favorite');
// Thêm công việc vào danh sách yêu thích
const Job = require('../models/job'); // Giả sử bạn có model Job

exports.toggleFavorite = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: 'Không có thông tin người dùng' });
    }

    const { jobID } = req.body; // Đảm bảo jobID là một chuỗi
    const userId = req.user.id;

   

    // Tìm công việc trong cơ sở dữ liệu với jobID là một chuỗi
    const job = await Job.findOne({ jobID: jobID });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Kiểm tra xem công việc đã tồn tại trong danh sách yêu thích của user chưa
    const existingFavorite = await Favorite.findOne({ jobID, userId });
    
    if (existingFavorite) {
      // Nếu đã tồn tại, xóa công việc yêu thích
      await Favorite.deleteOne({ jobID, userId });
      return res.status(200).json({ message: 'Đã xóa công việc khỏi danh sách yêu thích' });
    } else {
      // Nếu chưa có, thêm công việc vào danh sách yêu thích
      const newFavorite = new Favorite({ jobID, userId });
      await newFavorite.save();
      return res.status(200).json({ message: 'Đã thêm công việc vào danh sách yêu thích', favorite: newFavorite });
    }
  } catch (error) {
    console.error("Error:", error); // Ghi log lỗi
    res.status(500).json({ message: 'Server error', error });
  }
};


// Lấy ds công việc yêu thích
exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user.id; // Lấy userId từ thông tin người dùng đã xác thực từ JWT token

    // Nếu không có userId (người dùng chưa đăng nhập)
    if (!userId) {
      return res.status(400).json({ message: 'Không có thông tin người dùng' });
    }

    // Tìm các công việc yêu thích của người dùng từ collection Favorite
    const favorites = await Favorite.find({ userId }).select('jobID'); // Chỉ lấy jobID

    // Lấy tất cả jobID từ favorites
    const jobIDs = favorites.map(favorite => favorite.jobID);

    // Tìm các công việc trong collection Jobs dựa trên jobIDs
    const jobs = await Job.find({ jobID: { $in: jobIDs } }).select('jobID jobTitle jobCompanyName jobCompanyLogo jobSalary jobLocation jobUpdatedDate jobDescription');

    res.status(200).json({ favoriteJobs: jobs });
  } catch (error) {
    console.error("Error:", error); // Ghi log lỗi
    res.status(500).json({ message: 'Server error', error });
  }
};




