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

// tree class won't work so let's try some kinda nested array I guess - implement later

// define a schema
const TreeModelSchema = new mongoose.Schema ({
  creator_id    : String,
  creator_name  : String,
  contributor_names: Array,
  tree_object   : Array,
  public        : Boolean,
});
// might have to change tree data structure - also change in user.js

// compile model from schema
module.exports = mongoose.model('TreeModel', TreeModelSchema);