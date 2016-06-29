var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
bodyParser = require('body-parser'),
multer = require('multer'),
Grid = require('gridfs'),
Gridstream = require('gridfs-stream'),
mongoose = require('mongoose'),
router = require('./config/routes'),
apiRouter = require('./config/apiRouter'),
Music = require('./models/music');

app.set('views', './views');
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


app.use('/', router);
app.use('/api', apiRouter);

mongoose.connect('mongodb://localhost/pulse-express2');

app.listen(port, function(){
  console.log('Server started on ' + port);
});
