// dependencies
const express = require('express');
const connect = require('connect-ensure-login');

// models
const User = require('../models/user');
const Tree = require('../models/tree');
const Image = require('../models/image');
const Video = require('../models/video');
const Audio = require('../models/audio');
const Text = require('../models/text');

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
let index = 0;
router.get('/public-trees', function(req, res) {
  Tree.find({public: true}, function(err, trees) {
    res.send(trees);
    index += 4;
  }).skip(index).limit(4);
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
      'contributor_names': [], //why?
      'tree_object': [], 
      'public': true
    });
  
    newTree.save(function(err,tree) {
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
    'data': req.body.content,
    'type': req.body.type
  });

  newImage.save(function(err,image) {
    if (err) console.log(err);
  });
  res.send(newImage);
});

// videos
router.get('/videos', function(req, res) {
  Video.find({creator_id: req.query.creator_id}, function(err, videos) {
    res.send(videos);
  });
});

router.get('/video', function(req, res) {
  Video.findOne({_id: req.query._id}, function(err, video) {
    res.send(video);
  });
});

router.post('/video', connect.ensureLoggedIn(), function(req, res) {
  const newVideo = new Video({
    'creator_id': req.user._id,
    'creator_name': req.user.name,
    'data': req.body.content,
    'type': req.body.type
  });

  newVideo.save(function(err,video) {
    if (err) console.log(err);
  });
  res.send(newVideo);
});

// audio
router.get('/audios', function(req, res) {
  Audio.find({creator_id: req.query.creator_id}, function(err, audios) {
    res.send(audios);
  });
});

router.get('/audio', function(req, res) {
  Audio.findOne({_id: req.query._id}, function(err, audio) {
    res.send(audio);
  });
});

router.post('/audio', connect.ensureLoggedIn(), function(req, res) {
  const newAudio = new Audio({
    'creator_id': req.user._id,
    'creator_name': req.user.name,
    'data': req.body.content,
    'type': req.body.type
  });

  newAudio.save(function(err,audio) {
    if (err) console.log(err);
  });
  res.send(newAudio);
});

//text
router.get('/texts', function(req, res) {
  Text.find({creator_id: req.query.creator_id}, function(err, texts) {
    res.send(texts);
  });
});

router.get('/text', function(req, res) {
  Text.findOne({_id: req.query._id}, function(err, text) {
    res.send(text);
  });
});

router.post('/text', connect.ensureLoggedIn(), function(req, res) {
  const newText = new Text({
    'creator_id': req.user._id,
    'creator_name': req.user.name,
    'data': req.body.content,
    'type': req.body.type
  });

  newText.save(function(err,text) {
    if (err) console.log(err);
  });
  res.send(newText);
});

module.exports = router;
