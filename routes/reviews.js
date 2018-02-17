const router = require('express').Router({mergeParams: true});
const Review = require('../models/review');
const Bathroom = require('../models/bathroom');

router.get('/', (req, res) => {
  Bathroom.findById(req.params.bathroomId, (err, bathroom) => {
    let opts = [
      { path: 'reviews', sort: {'upvotes.all': -1} }
    ];
    Bathroom.populate(bathroom, opts, (err, bathroom) => {
      res.json(bathroom.reviews);
    });
  });
});

router.post('/', (req, res) => {
  Review.create(req.body, (err, review) => {
    //add poops to user
    res.json(review);
    Bathroom.findById(req.params.bathroomId, (err, b) => {
      b.reviews.push(review);
      b.save();
    });
  });
});

router.put('/:id', (req, res) => {
  Review.findById(req.params.id, (err, review) => {
    let upvotes = review.upvotes;
    switch(req.query.upvote) {
      case 'funny':
        upvotes.funny++;
        break;
      case 'serious':
        upvotes.serious++;
        break;
      case 'lifeChanging':
        upvotes.lifeChanging++;
        break;
      default:
        //do nothing
    }
    review.upvotes.all = upvotes.funny + upvotes.serious + upvotees.lifeChanging;
    review.save();
    res.json(review);
  });
});


module.exports = router;