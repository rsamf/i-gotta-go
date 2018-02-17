const shortid = require('shortid');

const BathroomSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
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
    value: Number,
    count: Number
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

module.exports = mongoose.model('bathroom', BathroomSchema);