var mongoose  = require("mongoose");
var localmong = require("passport-local-mongoose");

var userschema = new mongoose.Schema({
    username:String,
    password:String
});

userschema.plugin(localmong);
module.exports = mongoose.model("user",userschema);