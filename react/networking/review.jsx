import net from './index.jsx';

module.exports = {
  get: (bid, callback) => net.get(`/bathrooms/${bid}/reviews`, callback),
  post: (bid, data, callback) => net.post(`/bathrooms/${bid}/reviews`, data, callback),
  upvote: (rid, which, callback) => net.put(`/bathrooms/UNUSED/reviews/${rid}?upvote=${which}`, {}, callback)
};