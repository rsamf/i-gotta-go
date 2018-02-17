const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'review'
  },
  text: String,
  rating: Number,
  upvotes: {
    funny: Number,
    serious: Number,
    lifeChanging: Number,
    all: Number
  },
  stall: Number,
  pooped: Boolean,
  wouldRecommend: Boolean
}, {
  timestamps: true
});

module.exports = mongoose.model('review', ReviewSchema);