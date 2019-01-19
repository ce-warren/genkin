// import node modules
const mongoose = require('mongoose');

// define a schema
const TreeModelSchema = new mongoose.Schema ({
  creator_id    : String,
  creator_name  : String,
  contributor_names: Array,
  names   : Array, //of person objects - the automated IDs
  public        : Boolean,
});
// how to represent a "tree object"? (i.e. the actual data structure)

// compile model from schema
module.exports = mongoose.model('TreeModel', TreeModelSchema);