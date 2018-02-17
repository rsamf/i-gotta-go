import index from './index.jsx';

module.exports = {
  add: (data, callback) => index.post('/bathrooms', data, callback),
  get: (id, callback) => index.get('/bathrooms/'+id, callback),
  search: (coords, callback) => index.get(`/bathrooms?lat=${coords[0]}&lng=${coords[1]}`, callback)
};