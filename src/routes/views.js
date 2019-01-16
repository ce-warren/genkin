// dependencies
const express = require('express');
const router = express.Router();

// public endpoints
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: 'src/views' });
});

router.get('/about', function(req, res) {
  res.sendFile('about.html', { root: 'src/views' });
});

router.get('/gallery', function(req, res) {
  res.sendFile('gallery.html', { root: 'src/views' });
});

router.get('/u/user', function(req, res) {
  if (req.user !== undefined) {
    res.sendFile('user.html', { root: 'src/views' })
  }
  else {
    res.redirect('/auth/google')
  };
});

router.get('/user-trees', function(req, res) {
  if (req.user !== undefined) {
    res.sendFile('user-trees.html', { root: 'src/views' })
  }
  else {
    res.redirect('/auth/google')
  };
});

router.get('/user-trees', function(req, res) {
  if (req.user !== undefined) {
    res.sendFile('user-trees.html', { root: 'src/views' })
  }
  else {
    res.redirect('/auth/google')
  };
});

router.get('/media-gallery', function(req, res) {
  if (req.user !== undefined) {
    res.sendFile('media-gallery.html', { root: 'src/views' })
  }
  else {
    res.redirect('/auth/google')
  };
});

router.get('/tree-builder', function(req, res) {
  if (req.user !== undefined) {
    res.sendFile('tree-builder.html', { root: 'src/views' })
  }
  else {
    res.redirect('/auth/google')
  };
});

module.exports = router;
