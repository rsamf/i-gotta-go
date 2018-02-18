const shortid = require('shortid');
const mongoose = require('mongoose');

const BathroomSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  gId: String,
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  location: {
    buildingName: String,
    locatingDetails: String, /* Can be used to specify floor, room number, ... */ 
    street: String,
    city: String,
    state: String,
    zip: String,
    formatted: String,
    coordinates: [Number]
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'review'
  }],
  rating: {
    value: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  tags: [String],
  geo : {
    type : {
        type : String,
        default : 'Point'
    },
    coordinates : [Number]
  },
  busyTimeline: {
    entries: [[Number]],
    activation: Number
  },
  allGender: Boolean,
  feedbacks: {
    positives: {
      clean: Number,
      fancy: Number
    },
    negatives: {
      nasty: Number,
      smelly: Number,
      dontgo: Number
    }
  }
}, {
  timestamps: true
});

BathroomSchema.index({geo:'2dsphere'});

module.exports = mongoose.model('bathroom', BathroomSchema);