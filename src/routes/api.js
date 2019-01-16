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

router.post(
  '/tree',
  connect.ensureLoggedIn(),
  function(req, res) {
    const newTree = new Tree({
      'creator_id': req.user._id,
      'creator_name': req.user.name,
      'contributor_names': [],
      'tree_object': [],
      'public': true
    });
  
    newTree.save(function(err,story) {
      User.findOne({ _id: req.user._id },function(err,user) {
        user.save(); // this is OK, because the following lines of code are not reliant on the state of user, so we don't have to shove them in a callback. 
        });
        // configure socketio
      if (err) console.log(err);
    });

    res.send({});
  }
);

module.exports = router;
