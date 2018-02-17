const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  facebook: Object,
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'review'
  }],
  verifiedBathrooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bathroom'
  }],
  poops: Number
}, {
  timestamps: true
});