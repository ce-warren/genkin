// import node modules
const mongoose = require('mongoose');

// uh tree class data structure? is this how webdev works? -christina
// importing functions: https://stackoverflow.com/questions/43157936/javascript-import-function-syntax (for later)
class Tree {
  constructor () {
    this.names = [];
    this.child;
    this.mediaDict = {};
  };

  addName(name) {
    this.names.append(name);
  };

  removeName(name) {
    this.names.splice(this.names.indexOf(name), 1);
  };

  addChild() {
    this.child =  new TreeClass ();
  };

  removeChild() {
    this.child = undefined;
  };
};

// define a schema
const TreeModelSchema = new mongoose.Schema ({
  creator_id    : String,
  creator_name  : String,
  contributor_names: Array,
  tree_object   : Tree,
  public        : Boolean,
  title         : String,
});
// enforce titles being unique when creating a new tree
// also make creator_id req.user

// compile model from schema
module.exports = mongoose.model('TreeModel', TreeModelSchema);