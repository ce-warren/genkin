// import node modules
const mongoose = require('mongoose');

// define a schema
const PersonModelSchema = new mongoose.Schema({
    name: String,
    partner: String,
    subtree : Array, //array of tree IDs
    photos : Array,
    videos : Array,
    audios : Array,
    texts: Array
});
// how to represent a "tree object"? (i.e. the actual data structure)

// compile model from schema
module.exports = mongoose.model('PersonModel', PersonModelSchema);