const Profile = require('../models/profile');
const User = require('../models/user');
const multer = require('multer');
const cloudinary = require('../config/cloudinaryConfig');
const path = require('path');

exports.updateProfile = async (req, res) => {
    const { firstname, lastname,gender, birthday,
         jobtitle, level, companyfield, careerfield, experience, degree, address} = req.body;

    try {
        // Lấy email từ req.user (được giải mã từ token)
        const email = req.user.email;

    
         // Tìm user theo email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }
          // Cập nhật firstname và lastname trong collection User
        if (firstname) user.firstName = firstname;
        if (lastname) user.lastName = lastname;
        await user.save(); // Lưu thay đổi vào User

        // Tìm profile theo email
        let profile = await Profile.findOne({ email });

        if (!profile) {
            // Nếu không tìm thấy profile, tạo mới một profile
            profile = new Profile({
                email,
                gender,
                birthday,
                jobtitle,
                level,
                companyfield,
                careerfield,
                experience,
                degree,
                address,
                user: user._id // Liên kết với User ID
            });
        } else {
            // Nếu profile đã tồn tại, cập nhật thông tin
            profile.gender = gender;
            profile.birthday = birthday;
            profile.jobtitle = jobtitle;
            profile.level = level;
            profile.companyfield = companyfield;
            profile.careerfield = careerfield;
            profile.experience = experience;
            profile.degree = degree;
            profile.address = address;
        }

        

        // Lưu profile (có thể là cập nhật hoặc tạo mới)
        await profile.save();

        

        // Thành công, trả về profile đã cập nhật
        res.status(200).json({ message: 'Cập nhật profile thành công', profile });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Lỗi cập nhật profile' });
    }
};

exports.updateWorkplaceAndSalary = async (req, res) => {
    const { workplace, salary } = req.body;

    try {
        // Lấy email từ req.user (được giải mã từ token)
        const email = req.user.email;

        // Tìm user theo email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        // Tìm profile theo email
        let profile = await Profile.findOne({ email });

        if (!profile) {
            // Nếu không tìm thấy profile, tạo mới một profile với workplace và salary
            profile = new Profile({
                email,
                user: user._id, // Liên kết với User ID
                workplace,      // Thêm workplace
                salary          // Thêm salary
            });
        } else {
            // Nếu profile đã tồn tại, cập nhật các trường mới
            if (workplace) {
                profile.workplace = workplace;  // Cập nhật workplace
            }
            if (salary) {
                profile.salary = salary;  // Cập nhật salary
            }
        }

        // Lưu profile (mới hoặc đã cập nhật)
        await profile.save();

        // Thành công, trả về profile đã cập nhật
        res.status(200).json({ message: 'Cập nhật nơi làm việc và mức lương thành công', profile });
    } catch (error) {
        console.error('Error updating workplace and salary:', error);  // Thêm log chi tiết lỗi
        res.status(500).json({ message: 'Lỗi cập nhật nơi làm việc và mức lương', error: error.message });
    }
};









// Cấu hình Multer để tải ảnh lên tạm thời (trên server)
const storage = multer.memoryStorage();  // Sử dụng bộ nhớ tạm thời (upload vào bộ nhớ thay vì ổ cứng)
const upload = multer({ storage: storage }).single('avatar'); // Chỉ tải một ảnh tại một thời điểm

// Phương thức updateAvatar sử dụng Cloudinary để tải ảnh lên
exports.updateAvatar = (req, res) => {
    upload(req, res, async (err) => {
        // Kiểm tra lỗi Multer
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: 'Lỗi upload file', error: err.message });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            const email = req.user.email;

            // Tải ảnh lên Cloudinary
            cloudinary.uploader.upload_stream(
                { resource_type: 'auto' }, // Cloudinary sẽ tự động nhận diện loại file (ảnh, video, v.v.)
                async (error, result) => {
                    if (error) {
                        return res.status(500).json({ message: 'Lỗi tải ảnh lên Cloudinary', error });
                    }

                    // Lấy URL của ảnh từ kết quả trả về
                    const avatarUrl = result.secure_url;
                    // Tìm user theo email
                    let user = await User.findOne({ email });
                    // Tìm profile theo email
                    let profile = await Profile.findOne({ email });
                    if (!profile) {
                        return res.status(404).json({ message: 'Profile không tồn tại' });
                    }

                    // Cập nhật URL của avatar trong profile
                    profile.avatar = avatarUrl; // Lưu URL ảnh Cloudinary vào trường avatar
                    await profile.save(); // Lưu profile đã cập nhật

                    res.status(200).json({ message: 'Cập nhật avatar thành công', avatar: profile.avatar });
                }
            ).end(req.file.buffer); // 'req.file.buffer' chứa ảnh đã tải lên từ Multer
        } catch (error) {
            console.error('Error updating avatar:', error);
            res.status(500).json({ message: 'Lỗi cập nhật avatar' });
        }
    });
};

const uploadCV = multer({ storage: storage }).single('cv'); // Chỉ tải một CV tại một thời điểm
// Phương thức updateCV sử dụng Cloudinary để tải CV lên
exports.updateCV = (req, res) => {
    uploadCV(req, res, async (err) => {
        // Kiểm tra lỗi Multer
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: 'Lỗi upload file', error: err.message });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            const email = req.user.email;

            // Tải CV lên Cloudinary
            cloudinary.uploader.upload_stream(
                { resource_type: 'auto' }, // Cloudinary sẽ tự động nhận diện loại file (CV có thể là PDF hoặc ảnh)
                async (error, result) => {
                    if (error) {
                        return res.status(500).json({ message: 'Lỗi tải CV lên Cloudinary', error });
                    }

                    // Lấy URL của CV từ kết quả trả về
                    const cvUrl = result.secure_url;

                    // Tìm profile theo email
                    let profile = await Profile.findOne({ email });
                    if (!profile) {
                        return res.status(404).json({ message: 'Profile không tồn tại' });
                    }

                    // Cập nhật URL của CV trong profile
                    profile.cv = cvUrl; // Lưu URL CV Cloudinary vào trường cv
                    await profile.save(); // Lưu profile đã cập nhật

                    res.status(200).json({ message: 'Cập nhật CV thành công', cv: profile.cv });
                }
            ).end(req.file.buffer); // 'req.file.buffer' chứa file CV đã tải lên từ Multer
        } catch (error) {
            console.error('Error updating CV:', error);
            res.status(500).json({ message: 'Lỗi cập nhật CV' });
        }
    });
};