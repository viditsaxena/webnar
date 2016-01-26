var             express  = require('express'),
                mongoose = require('mongoose'),
              bodyParser = require('body-parser'),
              morgan     = require('morgan');


var WebinarsController = express.Router();
var Webinar = require('../models/webinar');

// Routes
WebinarsController.get('/', function(req, res){
  Webinar.find({}, function(err, webinars){
  res.json(webinars);
  });
});

WebinarsController.delete('/:id', function(req, res){
  var id = req.params.id;
  Webinar.findByIdAndRemove(id, function(){
    res.json({status: 202, message: 'Success'});
  });
});

WebinarsController.post('/', function(req, res){
  var webinar = new Webinar(req.body);
  webinar.save(function(){
    res.json(webinar);
  });
});

WebinarsController.patch('/:id', function(req, res){
  Webinar.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, updatedWebinar){
    res.json(updatedWebinar);
  });
});



module.exports = WebinarsController;
