const router = require('express').Router();
const Bathroom = require('../models/bathroom');
const globals = require('../globals');
const error = globals.onError;
const https = require('https');

router.get('/', (req, res) => {
  error(isNaN(req.query.lat) || isNaN(req.query.lng), res, "Invalid Coordinates");
  res.json({
    a: 'todo'
  });
});

router.post('/', (req, res) => {
  let b = req.body;
  if(b.coords) {
    let url =
      `${globals.URL.Geocoding}?latlng=${b.coords[0]},${b.coords[1]}&key=${globals.Key.Google.API}`;
    https.get(url, response => {
      response.setEncoding('utf8');
      let raw = "";
      response.on('data', chunk => {
        raw += chunk;
      });
      response.on('end', () => {
        createBathroom(JSON.parse(raw)[0]);
      });
    }).on('error', e => {
      error(e, res, "address error");
    });
  }
  else if(b.address) {
    let url = 
      `${globals.URL.Geocoding}?address=${b.address.replace(/ /g, '+')}&key=${globals.Key.Google.API}`;
    https.get(url, response => {
      response.setEncoding('utf8');
      let raw = "";
      response.on('data', chunk => {
        raw += chunk;
      });
      response.on('end', () => {
        createBathroom(JSON.parse(raw)[0]);
      });
    }).on('error', e => {
      error(e, res, "address error");
    });
  }

  function createBathroom(location){
    location = Object.assign(location, b.location);
    let c = location.geometry.location;
    Bathroom.create({
      location: {
        buildingName: location.buildingName,
        street: location.street,
        city: location.city,
        state: location.state,
        zip: location.zip,
        formatted: location.formatted_address,
        coordinates: [c[0], c[1]]
      },
      tags: b.tags,
      geo: {
        type: 'Point',
        coordinates: [c[1], c[0]]
      }
    }, (err, b) => {
      res.json(b);
    });
  }

});

router.get('/:id', (req, res) => {
  Bathroom.findById(req.params.id, (err, bathroom) => {
    error(err, res);
    res.json(bathroom);
  })
});

module.exports = router;