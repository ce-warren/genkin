//resetting the default each time the page is reloaded
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
const Person = require('../models/person');

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

//person
router.get('/person', function(req, res) {
  Person.findOne({_id: req.query._id}, function(err, person) {
    res.send(person);
  });
});

router.post('/person', connect.ensureLoggedIn(), function(req, res) {
  const newPerson = new Person({
    'name': req.body.name, //why is this not passed in?
    'partner': null,
    'subtree': [],
    'photos' : [],
    'videos' : [],
    'audios' : [],
    'texts': []
  });

  newPerson.save(function(err,person) {
    if (err) console.log(err);
  });
  res.send(newPerson);
});

router.post('/person-saver', connect.ensureLoggedIn(), function(req, res) {
  const newPerson = new Person({
    'name': req.body.name, //why is this not passed in?
    'partner': null,
    'subtree': req.body.subtree,
    'photos' : req.body.photos,
    'videos' : req.body.videos,
    'audios' : req.body.audios,
    'texts': req.body.texts
  });

  newPerson.save(function(err,person) {
    if (err) console.log(err);
  });
  res.send(newPerson);
});

router.post('/person-delete', connect.ensureLoggedIn(), function(req, res) {
  Person.findOneAndDelete({_id: req.body._id}, function(err, person) {
    res.send(person)
  });
})

router.post('/person-update', connect.ensureLoggedIn(), function(req, res) {
  Person.findOne({_id: req.body._id}, function(err, person) {
    person.partner = req.body.partner
    person.save()
  });
})

// trees
let initial = 0
router.get('/public-trees', function(req, res) {
  let index = req.query.to_skip;
  let q = Tree.find({public: req.query.public}, function(err, trees) {
    res.send(trees);
  });   
  q.skip(parseInt(index)).limit(10);
  q.exec();
});

router.get('/user-trees', function(req, res) {
  Tree.find({creator_id: req.query.creator_id, public: true}, function(err, trees) {
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
      'names': [],
      'public': req.body.public
    });
  
    newTree.save(function(err,tree) {
      if (err) console.log(err);
    });
    res.send(newTree);
  }
);

router.post('/tree-saver', connect.ensureLoggedIn(), function(req, res) {
  const newTree = new Tree({
    'creator_id': req.user._id,
    'creator_name': req.user.name,
    'contributor_names': [],
    'names': req.body.names,
    'public': req.body.public
  });

  newTree.save(function(err,tree) {
    if (err) console.log(err);
  });
  res.send(newTree);
});

router.post('/tree-delete', connect.ensureLoggedIn(), function(req, res) {
  Tree.findOneAndDelete({_id: req.body._id}, function(err, tree) {
    res.send(tree)
  });
})

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
