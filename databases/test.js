var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name : String,
    age: Number,
    temperament: String
}) ;

var cat = mongoose.model("cat",catSchema);
// var newcat = new cat({
//     name:"cat2",
//     age: 2,
//     temperament:"temp2"
// }) ;
// newcat.save(function(err,cat){
//     if(err){
//         console.log("An error has been discovered");
//         console.log(err);
//     }else{
//         console.log("saved successfuly");
//         console.log(cat);
//     }
// });
cat.find({name:"cat1"},function(err,cats){
    if(err){
        console.log("error found");
        console.log(cats);
    }else{
        console.log(cats);
    }
})