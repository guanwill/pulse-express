var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
multer = require('multer'),
Grid = require('gridfs'),
Gridstream = require('gridfs-stream'),
passport = require('passport'),
User = require('../models/user'),
Music = require('../models/music');
// uploadPath = '/uploads/';

router.get('/', function(request, response){
  Music.find({}, function(err, musics){
    console.log(musics);
    if(err) console.log(err);
    response.render('index', {'musics': musics, user: request.user});
  });
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/'); //UPLOAD MUSIC PATH
  },
  filename: function (req, file, cb) {
    var originalname = file.originalname;
    var extension = originalname.split(".");
    filename = Date.now() + '.' + extension[extension.length-1];
    cb(null, filename);
  }
});

// POST
router.post('/', multer({storage: storage}).single('uploads'), function(req,res){
  var music = new Music ({
    fieldname: req.file.fieldname,
    originalname: req.file.originalname,
    encoding: req.file.encoding,
    mimetype: req.file.mimetype,
    destination: req.file.destination,
    filename: req.file.filename,
    path: './uploads/' + req.file.filename,//req.file.path,  //PATH TO PLAY MUSIC
    size: req.file.size
  })
  music.save(function(err){
    if (err){console.log(err)}
    else {
      res.redirect('/')
      // res.json({message: 'success'});
    }
  })
});

//LOG OUT OF PASSPORT-GITHUB
router.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/');
});

// SHOW
router.get('/:id', function(request, response){
  Music.findById(request.params.id, function(err, musics) {
    if(err) console.log(err);
    response.render('show', {'musics': musics});
  })
})

// DELETE
router.get('/destroy/:id', function(request, response){
  Music.findById(request.params.id, function(err, music) {
    music.remove(function(err, music){
      response.redirect('/');
    })
  })
})

//PASSPORT-GITHUB
require("../config/passport")(passport)
router.get('/auth/github', passport.authenticate('github', {scope: 'email'}));

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }), function(req, res) {
    res.redirect('/');
  }
);




module.exports = router;
