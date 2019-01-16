// dependencies
const express = require('express');
const connect = require('connect-ensure-login');

// models
const User = require('../models/user');
const Tree = require('../models/tree');
const Image = require('../models/image');

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

// user
router.get('/user', function(req, res) {
  User.findOne({_id: req.query._id}, function(err, user) {
    res.send(user);
  });
});

// trees
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

router.get('/tree', function(req, res) {
  Tree.findOne({_id: req.query._id}, function(err, tree) {
    res.send(tree);
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
  
    newTree.save(function(err,tree) {
      Tree.findOne({ _id: req.user._id },function(err,tree) {
        });
      if (err) console.log(err);
    });
    res.send(newTree);
  }
);

// images
router.get('/images', function(req, res) {
  Image.find({creator_id: req.query.creator_id}, function(err, images) {
    res.send(images);
  });
});

router.get('/image', function(req, res) {
  Image.findOne({_id: req.query._id}, function(err, image) {
    res.send(image);
  });
});

router.post('/image', connect.ensureLoggedIn(), function(req, res) {
  const newImage = new Image({
    'creator_id': req.user._id,
    'creator_name': req.user.name,
    'data': req.body.content
  });

  newImage.save(function(err,image) {
    Image.findOne({ _id: req.user._id },function(err,image) {
      });
    if (err) console.log(err);
  });
  res.send(newImage);
});

module.exports = router;
