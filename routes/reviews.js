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
  console.log(req.body);
  let review = req.body;
  review.upvotes = {
    funny: 0,
    serious: 0,
    lifeChanging: 0,
    all: 0
  };
  let rating = review.rating;
  Review.create(review, (err, review) => {
    //add poops to user
    res.json(review);
    Bathroom.findById(req.params.bathroomId, (err, b) => {
      b.reviews.push(review);
      if(rating){
        let oldSum = b.rating.value*b.rating.count;
        let newSum = oldSum + rating;
        b.rating.value = newSum/(++b.rating.count);
      }
      b.save();
    });
  });
});

router.put('/:id', (req, res) => {
  Review.findById(req.params.id, (err, review) => {
    switch(req.query.upvote) {
      case 'funny':
        review.upvotes.funny++;
        break;
      case 'serious':
        review.upvotes.serious++;
        break;
      case 'lifeChanging':
        review.upvotes.lifeChanging++;
        break;
      default:
        //do nothing
    }
    let u = review.upvotes;
    review.upvotes.all = u.funny + u.serious + u.lifeChanging;
    review.save();
    console.log(review);
    res.json(review);
  });
});


module.exports = router;