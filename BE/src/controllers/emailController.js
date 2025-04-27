const transporter = require("../config/emailConfig");
const Application = require("../models/applications"); // Import model Application

const sendStatusEmail = async (req, res) => {
  const { applicationId, subject, text, html } = req.body;

  try {
    // Lấy thông tin ứng dụng từ database và populate jobID, userId
    const application = await Application.findById(applicationId).populate('jobID').populate('userId');
    if (!application) {
      return res.status(404).json({ message: "Không tìm thấy ứng dụng!" });
    }

    // Truy xuất các thông tin liên quan
    const { status, jobID, userId } = application;

    // Kiểm tra trạng thái email đã gửi
    if (application.emailSent?.get(status)) {
      return res
        .status(400)
        .json({ message: `Email cho trạng thái '${status}' đã được gửi trước đó!` });
    }

    // Xây dựng nội dung email tùy theo trạng thái
    let emailSubject = subject || `Cập nhật về trạng thái ứng tuyển cho công việc ${jobID.jobTitle}`;
    let emailText, emailHtml;

    if (status === "accepted") {
      // Trạng thái được duyệt
      emailText = text || `Xin chào ${userId.lastName} ${userId.firstName},\n\nChúc mừng! Bạn đã được duyệt cho công việc ${jobID.jobTitle} tại công ty ${jobID.jobCompanyName}. Công ty sẽ sớm liên hệ với bạn.\n\nCảm ơn bạn đã tham gia ứng tuyển!`;
      emailHtml = html || `<p>Xin chào ${userId.lastName} ${userId.firstName},</p><p>Chúc mừng! Bạn đã được duyệt cho công việc <strong>${jobID.jobTitle}</strong> tại công ty <strong>${jobID.jobCompanyName}</strong>. Công ty sẽ sớm liên hệ với bạn.</p><p>Cảm ơn bạn đã tham gia ứng tuyển!</p>`;
    } else if (status === "rejected") {
      // Trạng thái bị từ chối
      emailText = text || `Xin chào ${userId.lastName} ${userId.firstName},\n\nRất tiếc, bạn không được chọn cho công việc ${jobID.jobTitle} tại công ty ${jobID.jobCompanyName}. Chúng tôi rất cảm ơn sự quan tâm của bạn và hy vọng có thể làm việc cùng bạn trong tương lai.\n\nCảm ơn bạn đã tham gia ứng tuyển!`;
      emailHtml = html || `<p>Xin chào ${userId.lastName} ${userId.firstName},</p><p>Rất tiếc, bạn không được chọn cho công việc <strong>${jobID.jobTitle}</strong> tại công ty <strong>${jobID.jobCompanyName}</strong>. Chúng tôi rất cảm ơn sự quan tâm của bạn và hy vọng có thể làm việc cùng bạn trong tương lai.</p><p>Cảm ơn bạn đã tham gia ứng tuyển!</p>`;
    } else if (status === "pending") {
      // Trạng thái đang chờ
      emailText = text || `Xin chào ${userId.lastName} ${userId.firstName},\n\nTrạng thái ứng tuyển của bạn cho công việc ${jobID.jobTitle} tại công ty ${jobID.jobCompanyName} hiện đang chờ xét duyệt. Vui lòng chờ đợi thêm một thời gian nữa.\n\nCảm ơn bạn đã tham gia ứng tuyển!`;
      emailHtml = html || `<p>Xin chào ${userId.lastName} ${userId.firstName},</p><p>Trạng thái ứng tuyển của bạn cho công việc <strong>${jobID.jobTitle}</strong> tại công ty <strong>${jobID.jobCompanyName}</strong> hiện đang chờ xét duyệt. Vui lòng chờ đợi thêm một thời gian nữa.</p><p>Cảm ơn bạn đã tham gia ứng tuyển!</p>`;
    }

    // Log thông tin email để kiểm tra
    console.log("Đang gửi email với các thông tin sau:");
    console.log("From: ", process.env.EMAIL_USER);
    console.log("To: ", userId.email);  // Gửi email tới người dùng thực tế
    console.log("Subject: ", emailSubject);
    console.log("Text: ", emailText);
    console.log("HTML: ", emailHtml);

    // **Comment** phần gửi email để tránh gửi quá nhiều email
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Địa chỉ email gửi
      to: userId.email, // Địa chỉ email người nhận
      subject: emailSubject, // Tiêu đề email
      text: emailText, // Nội dung dạng text
      html: emailHtml, // Nội dung dạng HTML (tùy chọn)
    });
    

    // Cập nhật trạng thái email đã gửi
    application.emailSent = application.emailSent || {};
    application.emailSent.set(status, true);
    await application.save();

    res.status(200).json({ message: "Email đã được gửi thành công!" });
  } catch (error) {
    console.error("Lỗi gửi email:", error);
    res.status(500).json({ message: "Gửi email thất bại!", error });
  }
};

module.exports = { sendStatusEmail };
