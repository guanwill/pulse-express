var express = require('express'),
router = express.Router(),
fileSystem = require('fs'),
multer = require('multer'),
Music = require('../models/music'),
mongoose = require('mongoose'),
path = require('path');


//Shows lists -> GET '/api'
router.get('/', function(request, response){
  Music.find({}, function(err, musics){
    if(err) console.log(err);
    // response.send('LIST')
    // console.log(musics);
    response.json(musics);
  });
});

//Show a specific post -> GET '/lists/:id'
router.get('/:id', function(request, response){
  Music.findById(request.params.id, function(err, musics) {
    if(err) console.log(err);
    response.json(musics);
  })
})

router.get('/:id/media', function(request, response){
  Music.findById(request.params.id, function(err, music) {
    if(err) console.log(err);
    var filePath = path.join(__dirname, '..', 'public', music.path);
    var stat = fileSystem.statSync(filePath);
    console.log(stat);
    response.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size,
        'Access-Control-Allow-Origin' : '*'
    });
    // response.json(musics);
    var readStream = fileSystem.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(response);
  })
})

router.delete('/:id', function(request, response){
  Music.findById(request.params.id, function(err, music) {
    if(err) console.log(err);
    music.remove(function(err, music){
      response.send('Successfully deleted');
    })
  })
})


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
      res.json(music);
    }
  })
});

module.exports = router;


//Render a new post form -> GET '/lists/new'
// router.get('/new', function(req,res){
//   res.render('NEW')
// });

// //Create a new post -> POST '/lists'
// router.post('/', function(req, res){
//   res.send('post');
// });
//
// //Render the edit post form -> GET '/lists/:id/edit'
// router.get('/:id/edit',function(req,res){
//   res.send('EDIT');
// });
//
// //Render the edit post form -> PATCH/PUT '/lists/:id/'
// router.get('/:id',function(req,res){
//   res.send('UPDATE');
// });
//
// //delete a post -> DELETE '/lists/:id'
// router.delete('/:id', function(req, res){
//   res.send('DELETE');
// });

//export these routes
