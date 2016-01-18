var mongoose = require('mongoose');

var CodeShareSchema = new mongoose.Schema({
    title : String,
    description : String,
    tags : Array,
    code : String,
    postedDate : {type : Date, default : Date.now}
})

module.exports = mongoose.model('CodeShare', CodeShareSchema)