const Application = require('../models/applications');
const Job = require('../models/job'); // Giả sử bạn có model Job
const Profile = require('../models/profile');
const Notification = require('../models/notification'); // Import model Notification

// Hàm xử lý ứng tuyển công việc
exports.applyForJob = async (req, res) => {
  try {
    const userId = req.user.id; // Lấy userId từ token
    const email = req.user.email; // Lấy email từ token
    const { jobID } = req.body; // Thay jobI thành jobID cho đúng

    // Kiểm tra xem jobID có được cung cấp không
    if (!jobID) {
      return res.status(400).json({ message: 'Vui lòng cung cấp jobID(_id)' });
    }

   

    // Kiểm tra xem công việc có tồn tại hay không
    const job = await Job.findById(jobID); // Sử dụng jobID đúng
    if (!job) {
      return res.status(404).json({ message: 'Công việc không tồn tại' });
    }

      // Lấy profile của người dùng từ userId
    const profile = await Profile.findOne({ email });
    if (!profile) {
      return res.status(404).json({ message: 'Không tìm thấy profile của người dùng' });
    }

    // Kiểm tra xem người dùng đã ứng tuyển vào công việc này chưa
    const existingApplication = await Application.findOne({ userId, jobID }); // Sử dụng jobID đúng
    if (existingApplication) {
      return res.status(400).json({ message: 'Bạn đã ứng tuyển công việc này rồi' });
    }

    // Tạo ứng tuyển mới
    const application = new Application({
        profileId: profile._id,
      userId,
      jobID, // Sử dụng jobID đúng
      status: 'pending' // Trạng thái mặc định
    });

    // Lưu ứng tuyển vào cơ sở dữ liệu
    await application.save();

    res.status(201).json({ message: 'Ứng tuyển thành công', application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi ứng tuyển' });
  }
};


/// Lấy ds công việc đã ứng tuyển của user
exports.getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user.id; // Lấy userId từ thông tin người dùng đã xác thực từ JWT token

    // Nếu không có userId (người dùng chưa đăng nhập)
    if (!userId) {
      return res.status(400).json({ message: 'Không có thông tin người dùng' });
    }

    // Tìm các công việc mà người dùng đã ứng tuyển từ collection Application
    const applications = await Application.find({ userId }).select('jobID'); // Chỉ lấy jobID từ ứng tuyển

    // Lấy tất cả jobID từ applications
    const jobIDs = applications.map(application => application.jobID);

    // Tìm các công việc trong collection Jobs dựa trên jobIDs
    const jobs = await Job.find({ _id: { $in: jobIDs } }).select('jobID jobTitle jobCompanyName jobCompanyLogo jobSalary jobLocation jobUpdatedDate jobDescription');

    res.status(200).json({ appliedJobs: jobs });
  } catch (error) {
    console.error("Error:", error); // Ghi log lỗi
    res.status(500).json({ message: 'Server error', error });
  }
};

// Lấy ds tất cả các đơn ứng tuyển
exports.getAllApplications = async (req, res) => {
  try {
    // Tìm tất cả các đơn ứng tuyển trong collection Application
    const applications = await Application.find()
      .populate('userId', 'firstName lastName email phone') // Lấy thông tin người dùng ứng tuyển
      .populate('jobID', 'jobTitle jobLocation jobCompanyName jobSalary jobDescription jobLevel jobIndustry jobField') // Lấy thông tin công việc
        .populate('profileId', 'workplace salary address birthday careerfield companyfield degree experience gender jobtitle level cv avatar') // Lấy thông tin công việc
      
      .exec();

    if (applications.length === 0) {
      return res.status(404).json({ message: 'Không có đơn ứng tuyển nào' });
    }

    // Trả về danh sách đơn ứng tuyển
    res.status(200).json({ applications });
  } catch (error) {
    console.error("Error:", error); // Ghi log lỗi
    res.status(500).json({ message: 'Server error', error });
  }
};


// Lấy thông tin đơn ứng tuyển và chấp nhận
exports.acceptApplication = async (req, res) => {
  try {
    const { applicationId } = req.params; // Lấy applicationId từ params

    // Tìm đơn ứng tuyển theo ID
    const application = await Application.findById(applicationId).populate("jobID");
    if (!application) {
      return res.status(404).json({ message: 'Đơn ứng tuyển không tồn tại' });
    }

    // Kiểm tra nếu trạng thái đã là 'accepted'
    if (application.status === 'accepted') {
      return res.status(400).json({ message: 'Đơn ứng tuyển đã được chấp nhận rồi' });
    }

    // Cập nhật trạng thái của đơn ứng tuyển thành 'accepted'
    application.status = 'accepted';
    await application.save();

    // Tạo thông báo cho user
    const notification = new Notification({
      userId: application.userId._id, // ID của user nhận thông báo
      message: `Đơn ứng tuyển của bạn cho công việc "${application.jobID.jobTitle}" đã được chấp nhận.Công ty "${application.jobID.jobCompanyName}" sẽ sớm liên hệ với bạn!`, // Nội dung thông báo
    });

    await notification.save(); // Lưu thông báo vào cơ sở dữ liệu

    // Trả về kết quả thành công
    res.status(200).json({ message: 'Đơn ứng tuyển đã được chấp nhận và thông báo đã được gửi đến ứng viên', application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi chấp nhận đơn ứng tuyển', error });
  }
};

// Lấy thông tin đơn ứng tuyển và từ chối
exports.rejectApplication = async (req, res) => {
  try {
    const { applicationId } = req.params; // Lấy applicationId từ params

    // Tìm đơn ứng tuyển theo applicationId và populate jobID
    const application = await Application.findById(applicationId).populate('jobID');
    if (!application) {
      return res.status(404).json({ message: 'Đơn ứng tuyển không tồn tại' });
    }

    // Kiểm tra nếu trạng thái đã là 'rejected'
    if (application.status === 'rejected') {
      return res.status(400).json({ message: 'Đơn ứng tuyển đã bị từ chối' });
    }

    // Cập nhật trạng thái của đơn ứng tuyển thành 'rejected'
    application.status = 'rejected';
    await application.save();

    // Tạo thông báo cho user
    const notification = new Notification({
      userId: application.userId._id, // ID của user nhận thông báo
      message: `Đơn ứng tuyển của bạn cho công việc "${application.jobID.jobTitle}" đã bị từ chối. Cảm ơn bạn đã quan tâm đến công việc này.`,
    });

    await notification.save(); // Lưu thông báo vào cơ sở dữ liệu

    // Trả về kết quả thành công
    res.status(200).json({ message: 'Đơn ứng tuyển đã bị từ chối và thông báo đã được gửi đến ứng viên', application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi từ chối đơn ứng tuyển', error });
  }
};



// Lấy thông tin đơn ứng tuyển và xóa
exports.deleteApplication = async (req, res) => {
  try {
    const { applicationId } = req.params; // Lấy applicationId từ params

    // Tìm đơn ứng tuyển theo applicationId
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Đơn ứng tuyển không tồn tại' });
    }

    // Xóa đơn ứng tuyển
    await application.remove();

    // Trả về kết quả thành công
    res.status(200).json({ message: 'Đơn ứng tuyển đã được xóa' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa đơn ứng tuyển', error });
  }
};


// Kiểm tra người dùng đã ứng tuyển vào công việc hay chưa
exports.hasAppliedForJob = async (req, res) => {
  try {
    const userId = req.user.id; // Lấy userId từ token người dùng
    const { jobID } = req.body; // Lấy jobID từ body yêu cầu

    // Kiểm tra nếu không có jobID
    if (!jobID) {
      return res.status(400).json({ message: 'Vui lòng cung cấp jobID' });
    }

    // Kiểm tra xem người dùng đã ứng tuyển vào công việc này chưa
    const existingApplication = await Application.findOne({ userId, jobID });

    if (existingApplication) {
      // Nếu tìm thấy đơn ứng tuyển, người dùng đã ứng tuyển
      return res.status(200).json({ hasApplied: true });
    } else {
      // Nếu không tìm thấy đơn ứng tuyển, người dùng chưa ứng tuyển
      return res.status(200).json({ hasApplied: false });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi kiểm tra ứng tuyển', error });
  }
};


