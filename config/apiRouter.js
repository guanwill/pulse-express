var express = require('express'),
router = express.Router();



//Shows lists -> GET '/lists'
router.get('/', function(req, res){
  res.send(req.files);
});

//Render a new post form -> GET '/lists/new'
router.get('/new', function(req,res){
  res.render('NEW')
});

//Show a specific post -> GET '/lists/:id'
router.get('/:id', function(req, res){
  res.send('SHOW');
});

//Create a new post -> POST '/lists'
router.post('/', function(req, res){
  res.send('POST');
});

//Render the edit post form -> GET '/lists/:id/edit'
router.get('/:id/edit',function(req,res){
  res.send('EDIT');
});

//Render the edit post form -> PATCH/PUT '/lists/:id/'
router.get('/:id',function(req,res){
  res.send('UPDATE');
});

//delete a post -> DELETE '/lists/:id'
router.delete('/:id', function(req, res){
  res.send('DELETE');
});

//export these routes
module.exports = router;
