const router = require('express').Router();
const Bathroom = require('../models/bathroom');
const globals = require('../globals');
const error = globals.onError;
const https = require('https');

router.get('/', (req, res) => {
  error(isNaN(req.query.lat) || isNaN(req.query.lng), res, "Invalid Coordinates");
  let pipeline = Bar.aggregate([{
    $geoNear : {
      near : {
          type : "Point",
          coordinates : [parseFloat(req.query.lng), parseFloat(req.query.lat)]
      },
      distanceField : "dist.calculated",
      includeLocs : "dist.location",
      spherical : true
    }
  }, {
    $limit: req.query.limit || 20
  }]);

  pipeline.exec((err, bathrooms)=>{
    error(err, res);
    res.json(bathrooms);
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
        createBathroom(JSON.parse(raw).results[0]);
      });
    }).on('error', e => {
      error(e, res, "address error");
    });
  }

  function createBathroom(location){
    location = Object.assign(location, b.location);
    let c = location.geometry.location;
    let toSend = {
      location: {
        buildingName: location.buildingName,
        street: location.street,
        city: location.city,
        state: location.state,
        zip: location.zip,
        formatted: location.formatted_address,
        coordinates: [c.lat, c.lng]
      },
      tags: b.tags || [],
      geo: {
        type: 'Point',
        coordinates: [c.lng, c.lat]
      }
    };
    console.log(toSend);
    Bathroom.create(toSend, (err, b) => {
      //add poops to user
      error(err, res);
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

router.put('/:id', (req, res) => {
  Bathroom.findByIdAndUpdate(req.params.id, req.body, (err, bathroom) => {
    error(err, res);
    res.json(bathroom);
  });
})

module.exports = router;