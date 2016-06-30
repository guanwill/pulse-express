var mongoose = require('mongoose');
module.exports = mongoose.model('User', {
  github: {
    id: String,
    access_token: String,
    name: String,
    email: String
  }
})
