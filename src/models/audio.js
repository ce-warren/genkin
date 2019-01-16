// import node modules
const mongoose = require('mongoose');

// define a schema
const AudioModelSchema = new mongoose.Schema ({
  creator_id: String,
  creator_name: String,
  data: String,
  type: String
});

// compile model from schema
module.exports = mongoose.model('AudioModel', AudioModelSchema);
