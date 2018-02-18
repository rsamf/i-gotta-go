import index from './index.jsx';

module.exports = {
  add: (data, callback) => index.post('/bathrooms', data, callback),
  get: (id, callback) => index.get('/bathrooms/'+id, callback),
  gGet: (id, callback) => index.get('/bathrooms/'+id+'/u', callback),
  search: (coords, callback) => index.get(`/bathrooms?lat=${coords[0]}&lng=${coords[1]}`, callback),
  allGender: (id, isAll, callback) => index.put(`/bathrooms/${id}?gender=${isAll ? 'all':'strict'}`, {}, callback)
};