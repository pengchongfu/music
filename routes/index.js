var express = require('express');
var router = express.Router();
var fs=require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('music', { title: 'Express' });
});

router.post('/',function(req,res,next){
  fs.readdir('../public/music',function(err,files){
    res.json(files);
  });
});

module.exports = router;
