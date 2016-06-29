var mongoose = require('mongoose');

var musicSchema = new mongoose.Schema({
  fieldname: String,
  originalname: String,
  encoding: String,
  mimeptype: String,
  destination: String,
  filename: String,
  path: String,
  size: Number,
  created_at: Date,
  updated_at: Date
});

//define a pre save hook function to save date
musicSchema.pre('save', function(next){  //every time an instance is saved
  var now = new Date(); //update the date field to now
  this.updated_at = now; //every time we update, set that field to now
  if(!this.created_at) {
    this.created_at = now;
  }
  next();
});

//registering our schema with mongoose/mongo
var Music = mongoose.model('Music', musicSchema);

module.exports = Music;
