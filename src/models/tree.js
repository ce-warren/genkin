// import node modules
const mongoose = require('mongoose');

// uh tree class data structure? is this how webdev works? -christina
// importing functions: https://stackoverflow.com/questions/43157936/javascript-import-function-syntax (for later)
function Tree () {
  this.names = [];
  this.child;
  this.mediaDict = {}

  this.addName = function(name) {
    this.names.append(name);
  };

  this.removeName = function(name) {
    this.names.splice(this.names.indexOf(name), 1);
  };

  this.addChild = function() {
    this.child =  new TreeClass ();
  };

  this.removeChild = function() {
    this.child = undefined
  };
};

// define a schema
const TreeModelSchema = new mongoose.Schema ({
  creator_id    : String,
  creator_name  : String,
  tree          : Tree,
});

// compile model from schema
module.exports = mongoose.model('TreeModel', TreeModelSchema);
