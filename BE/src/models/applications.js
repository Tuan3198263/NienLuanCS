// models/applications.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
 jobID: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Job',  // Giả sử bạn có model 'Job'
  required: true
},
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Giả sử bạn có model 'User'
    required: true
  },
   profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile', // Liên kết với model 'Profile'
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],  // Trạng thái ứng tuyển
    default: 'pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
   emailSent: {
    type: Map,
    of: Boolean, // Lưu trạng thái email đã gửi (key: trạng thái, value: true/false)
    default: {}, // Mặc định chưa gửi email cho bất kỳ trạng thái nào
  },
});

module.exports = mongoose.model('Application', applicationSchema);
