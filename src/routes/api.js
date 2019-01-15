// dependencies
const express = require('express');
const connect = require('connect-ensure-login');

// models
const User = require('../models/user');
const Tree = require('../models/tree');

const router = express.Router();

// api endpoints
router.get('/whoami', function(req, res) {
  
  if(req.isAuthenticated()){
    res.send(req.user);
  }
  else{
    res.send({});
  }
});

router.get('/user', function(req, res) {
  User.findOne({ _id: req.query._id }, function(err, user) {
    res.send(user);
  });
});

router.get('/trees', function(req, res) {
  Tree.find({}, function(err, trees) {
    res.send(trees);
  });
});

module.exports = router;
