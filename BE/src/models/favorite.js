// src/models/favoriteModel.js
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  jobID: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Giả sử bạn có model 'User'
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Favorite', favoriteSchema);
