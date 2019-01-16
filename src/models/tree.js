// import node modules
const mongoose = require('mongoose');

// define a schema
const TreeModelSchema = new mongoose.Schema ({
  creator_id    : String,
  creator_name  : String,
  contributor_names: Array,
  tree_object   : Array,
  public        : Boolean,
});
// how to represent a "tree object"? (i.e. the actual data structure)

// compile model from schema
module.exports = mongoose.model('TreeModel', TreeModelSchema);