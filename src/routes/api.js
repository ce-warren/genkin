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
  User.findOne({_id: req.query._id }, function(err, user) {
    res.send(user);
  });
});

router.get('/public-trees', function(req, res) {
  Tree.find({public: true}, function(err, trees) {
    res.send(trees);
  });
});

router.get('/user-trees', function(req, res) {
  Tree.find({creator_id: req.query.creator_id}, function(err, trees) {
    res.send(trees);
  });
});

router.post('/tree', connect.ensureLoggedIn(), function(req, res) {
    const newTree = new Tree({
      'creator_id': req.user._id,
      'creator_name': req.user.name,
      'contributor_names': [],
      'tree_object': [],
      'public': true
    });
  
    newTree.save(function(err,story) {
      User.findOne({ _id: req.user._id },function(err,user) {
        user.save();
        });
      if (err) console.log(err);
    });
    res.send(newTree);
  }
);

module.exports = router;
