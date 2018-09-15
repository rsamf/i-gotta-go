const router = require('express').Router();
const Bathroom = require('../models/bathroom');
const globals = require('../globals');
const error = globals.onError;
const https = require('https');
const MAX = 30;
const TYPES = ['cafe', 'gas_station', 'store', 'liqour_store', 'bar'];

router.get('/', (req, res, next) => {
  if(error(isNaN(req.query.lat) || isNaN(req.query.lng), res, "Invalid Coordinates")) return;
  let pipeline = Bathroom.aggregate([{
    $geoNear : {
      near : {
          type : "Point",
          coordinates : [parseFloat(req.query.lng), parseFloat(req.query.lat)]
      },
      maxDistance: 2000,
      distanceField : "dist.calculated",
      includeLocs : "dist.location",
      spherical : true
    }
  }, {
    $limit: req.query.limit || MAX
  }]);

  pipeline.exec((err, bathrooms)=>{
    error(err, bathrooms);
    bathrooms.forEach(b => {
      b.verified = true;
    });

    let url = 
    `${globals.URL.Places}?location=${req.query.lat},${req.query.lng}&key=${globals.Key.Google.API}`;
    url+="&opennow=true";
    url+="&rankby=distance";
    console.log(url);
    let count = 0;
    TYPES.forEach(t => {
      let newURL = url+"&type="+t;
      https.get(newURL, response => {
        response.setEncoding('utf8');
        let raw = "";
        response.on('data', chunk => {
          raw += chunk;
        });
        response.on('end', () => {
          count++;
          let final = JSON.parse(raw);
          console.log(final);
          respondWithBathrooms(final);
        });
      }).on('error', e => {
        console.log("ERROR", e);
        error(e, res, "address error");
      });
    });
    let googleBathrooms = [];
    function respondWithBathrooms(b){
      googleBathrooms.push(b.results);
      //bathrooms.push(b)
      if(count == TYPES.length) {
        // console.log(googleBathrooms[0]);
        let toReturn = [...bathrooms];
        let n = MAX-bathrooms.length;
        for(let i = 0; i < n; i++){
          let listIndex = i%TYPES.length;
          let listLength = googleBathrooms[listIndex].length;
          let specIndex = Math.floor(i/TYPES.length);
          if(specIndex < listLength){
            let toPush = googleBathrooms[listIndex][specIndex];
            // console.log(toPush);
            toPush.verified = false;
            if(noDuplicates(bathrooms, toPush)) toReturn.push(toPush);
          }
        }
        // console.log(toReturn);
        res.json(toReturn);
      }
    }
  });
});

router.post('/', (req, res) => {
  let b = req.body;
  console.log("B", b);
  if(b.coords) {
    console.log(b.coords);
    let url =
      `${globals.URL.Geocoding}?latlng=${b.coords[0]},${b.coords[1]}&key=${globals.Key.Google.API}`;
    https.get(url, response => {
      response.setEncoding('utf8');
      let raw = "";
      response.on('data', chunk => {
        raw += chunk;
      });
      response.on('end', () => {
        let completed = JSON.parse(raw).results;
        console.log(completed[0]);
        createBathroom(completed[0]);
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
    console.log("id", b.gId);
    console.log(location);
    location = Object.assign(location || {}, b.location);
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
      gId: b.gId,
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
  Bathroom.findById(req.params.id).populate('reviews').exec((err, bathroom) => {
    error(err, res);
    res.json(bathroom);
  });
});

router.get('/:id/u', (req, res)=> {
  let url = `${globals.URL.Place}?placeid=${req.params.id}&key=${globals.Key.Google.API}`;
  console.log(url);
  https.get(url, response => {
    response.setEncoding('utf8');
    let raw = "";
    response.on('data', chunk => {
      raw += chunk;
    });
    response.on('end', () => {
      console.log(raw);
      res.json(JSON.parse(raw).result);
    });
  }).on('error', e => {
    error(e, res, "error request place");
  });
});

router.put('/:id', (req, res) => {
  if(req.query.gender) {
    Bathroom.findById(req.params.id, (err, bathroom) => {
      error(err, res);
      bathroom.allGender = req.query.gender == 'all' ? true : false;
      bathroom.save();
    });
  } else {
    Bathroom.findByIdAndUpdate(req.params.id, req.body, (err, bathroom) => {
      error(err, res);
      res.json(bathroom);
    });
  }

})

function noDuplicates(A, ele){
  console.log("looking at:", ele);
  for(let i = 0; i < A.length; i++){
    if(ele.place_id == A[i].gId) return false;
  }
  return true;
}
module.exports = router;