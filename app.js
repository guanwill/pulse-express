var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
bodyParser = require('body-parser'),
multer = require('multer'),
Grid = require('gridfs'),
Gridstream = require('gridfs-stream'),
mongoose = require('mongoose'),
passport = require('passport'),
expressSession = require('express-session'),
cors = require('cors'),
router = require('./config/routes'),
apiRouter = require('./config/apiRouter'),
User = require('./models/user'),
Music = require('./models/music');

app.set('views', './views');
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use('/api', apiRouter);
app.use('/', router);


mongoose.connect('mongodb://localhost/pulse-express2');


require("./config/passport")(passport)


app.listen(port, function(){
  console.log('Server started on ' + port);
});
