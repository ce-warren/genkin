// import node modules
const mongoose = require('mongoose');

// define a schema
const VideoModelSchema = new mongoose.Schema ({
  creator_id: String,
  creator_name: String,
  data: String,
});

// compile model from schema
module.exports = mongoose.model('VideoModel', VideoModelSchema);
