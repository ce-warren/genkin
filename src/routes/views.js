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
    res.sendFile('index.html', { root: 'src/views' })
  }
  ;
});

module.exports = router;
