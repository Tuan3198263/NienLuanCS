// /src/controller/jobController.js
const Job = require('../models/job');  // Import Job model từ models/jobModel.js
const Company = require('../models/company');  // Đảm bảo bạn có model Company
const Application = require('../models/applications');
const Favorite = require('../models/favorite');

// Lấy danh sách tất cả công việc
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();  // Truy vấn MongoDB để lấy tất cả công việc
    res.status(200).json(jobs);  // Trả về danh sách công việc
  } catch (err) {
    res.status(500).json({ message: 'Error fetching jobs', error: err });
  }
};


// API lọc công việc theo ngành nghề và lĩnh vực
exports.getJobFilter = async (req, res) => {
  try {
    // Lấy các tham số bộ lọc từ query string
    const { jobIndustry, jobField } = req.query;

    console.log("Received filter parameters:", req.query);  // In ra các tham số lọc nhận được từ query string

    // Tạo một đối tượng filter với các tham số lọc
    const filter = {};

    // Kiểm tra xem có tham số ngành nghề hay không
    if (jobIndustry) {
      filter.jobIndustry = jobIndustry; // Lọc theo ngành nghề
      console.log("Applying jobIndustry filter:", jobIndustry);  // In ra ngành nghề đang được áp dụng
    }

    // Kiểm tra xem có tham số lĩnh vực hay không
    if (jobField) {
      filter.jobField = jobField; // Lọc theo lĩnh vực
      console.log("Applying jobField filter:", jobField);  // In ra lĩnh vực đang được áp dụng
    }

    // Truy vấn công việc theo bộ lọc
    const jobs = await Job.find(filter);
    
    console.log("Filtered jobs:", jobs);  // In ra các công việc sau khi lọc

    // Trả về danh sách công việc sau khi lọc
    res.status(200).json(jobs);
  } catch (err) {
    console.error("Error during job filtering:", err);  // In ra lỗi nếu có
    res.status(500).json({ message: 'Error fetching filtered jobs', error: err });
  }
};

/// Lấy một công việc theo jobID
exports.getJobById = async (req, res) => {
  const { jobID } = req.params;  // Lấy jobID từ tham số đường dẫn (URL)

  try {
    // Tìm công việc theo jobID
    const job = await Job.findOne({ jobID });

    // Nếu không tìm thấy công việc
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Trả về công việc tìm được
    res.status(200).json(job);
  } catch (err) {
    console.error('Error fetching job:', err);
    res.status(500).json({ message: 'Error fetching job', error: err.message });
  }
};


// Thêm công việc mới
exports.createJob = async (req, res) => {
  const { companyName } = req.body; // Lấy các trường cần thiết từ request body

  try {
    // Kiểm tra xem công ty đã tồn tại chưa
    const company = await Company.findOne({ companyName }); // Tìm công ty theo tên
    if (!company) {
      return res.status(404).json({ message: 'Company not found' }); // Nếu không tìm thấy công ty, trả về lỗi
    }

    // Tạo job ID ngẫu nhiên
    const jobID = Math.floor(Math.random() * 1000000);

    // Tạo công việc mới
    const newJob = new Job({
      ...req.body,  
      jobID,                  // jobID ngẫu nhiên
      jobCompanyId: company.companyId,   // Gán jobCompanyId từ công ty
      jobCompanyLogo: company.companyLogo, // Gán jobCompanyLogo từ công ty
      jobCompanyName: company.companyName,
      jobUpdatedDate: new Date()          // Gán jobUpdatedDate là ngày hiện tại
    });

    // Lưu công việc mới vào cơ sở dữ liệu
    const job = await newJob.save();

    // Trả về công việc mới tạo
    res.status(201).json(job);
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(500).json({ message: 'Error creating job', error: err.message });
  }
};



exports.deleteJob = async (req, res) => {
  const { jobID } = req.params;  // Lấy jobID từ tham số đường dẫn (URL)

  try {
    // Kiểm tra xem jobID có tồn tại trong collection jobs không
    const job = await Job.findOne({ jobID });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Xóa tất cả các đơn ứng tuyển có jobID là ObjectId liên kết tới công việc
    await Application.deleteMany({ jobID: job._id });

    // Kiểm tra và xóa tất cả các bản ghi trong collection favorites có jobID giống với jobID truyền vào
    // Nếu jobID trong favorites là ObjectId, cần chuyển jobID thành ObjectId
    await Favorite.deleteMany({ JobID: jobID });

     // Xóa tất cả các bản ghi trong collection favorites có JobID là String
    await Favorite.deleteMany({ jobID });

      // Xóa công việc khỏi collection jobs
    const deletedJob = await Job.findOneAndDelete({ jobID });


    // Trả về thông báo xóa thành công
    res.status(200).json({
      message: 'Job and related applications and favorites deleted successfully',
      job: deletedJob,
    });
  } catch (err) {
    console.error('Error deleting job:', err);
    res.status(500).json({ message: 'Error deleting job', error: err.message });
  }
};

// Lấy danh sách công việc theo companyId
exports.getJobsByCompany = async (req, res) => {
  const { companyId } = req.params;  // Lấy companyId từ tham số đường dẫn (URL)

  try {
    // Tìm tất cả các công việc có companyId tương ứng
    const jobs = await Job.find({ jobCompanyId: companyId });

    // Kiểm tra nếu không có công việc nào
    if (!jobs.length) {
      return res.status(404).json({ message: 'No jobs found for this company' });
    }

    // Trả về danh sách công việc
    res.status(200).json(jobs);
  } catch (err) {
    console.error('Error fetching jobs for company:', err);
    res.status(500).json({ message: 'Error fetching jobs', error: err.message });
  }
};

exports.searchJobByTitle = async (req, res) => {
    try {
        const jobTitle = req.query.title?.trim(); // Loại bỏ khoảng trắng thừa

        if (!jobTitle) {
            return res.status(400).json({ message: 'Vui lòng cung cấp tiêu đề công việc để tìm kiếm' });
        }

        // Tìm kiếm công việc bằng jobTitle với $regex
        const jobs = await Job.find({
            jobTitle: { 
                $regex: new RegExp(jobTitle, 'i') // Sử dụng RegExp để có thể kiểm soát tốt hơn
            }
        });

        if (jobs.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy công việc nào phù hợp' });
        }

        res.status(200).json(jobs);
    } catch (error) {
        console.error('Lỗi khi tìm kiếm công việc:', error.message); // Log lỗi để dễ dàng xác định nguyên nhân
        res.status(500).json({ message: 'Đã xảy ra lỗi khi tìm kiếm công việc', error: error.message });
    }
};

exports.updateJob = async (req, res) => {
  const { jobID } = req.params;  // Lấy jobID từ tham số đường dẫn (URL)
  const updates = req.body;  // Lấy các trường cần cập nhật từ body yêu cầu

  // Thêm trường jobUpdatedDate với ngày hiện tại vào updates
  updates.jobUpdatedDate = new Date();  // Gán ngày hiện tại

  try {
    // Cập nhật công việc chỉ với các trường có trong body, bao gồm jobUpdatedDate
    const updatedJob = await Job.findOneAndUpdate(
      { jobID },              // Điều kiện tìm công việc theo jobID
      { $set: updates },      // Chỉ cập nhật các trường trong updates
      { new: true }           // Trả về công việc đã được cập nhật
    );

    // Kiểm tra xem công việc có tồn tại sau khi cập nhật không
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Trả về công việc sau khi cập nhật
    res.status(200).json(updatedJob);
  } catch (err) {
    console.error('Error updating job:', err);
    res.status(500).json({ message: 'Error updating job', error: err.message });
  }
};











