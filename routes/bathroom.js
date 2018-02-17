const router = require('express').Router();
const Bathroom = require('../models/bathroom');
const globals = require('../globals');
const Validator = new globals.Validator();
const error = globals.onError;

router.get('/', (req, res) => {
  error(isNaN(req.query.lat) || isNaN(req.query.lng), res, "Invalid Coordinates");
  res.json({
    a: 'todo'
  });
});

router.post('/', (req, res) => {
  let b = req.body;


  Bathroom.create({
    location: {

    }
  });
});

router.get('/:id', (req, res) => {
  Bathroom.findById(req.params.id, (err, bathroom) => {
    error(err, res);
    res.json(bathroom);
  })
});

module.exports = router;