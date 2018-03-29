var mongoose   = require("mongoose");
var campground = require("./models/campgrounds");
var comment    = require("./models/comments");

var data = [
    {
        name:"cornwall",
        image:"https://coolcamping.com/system/boxes/699/campsites-in-cornwall-england-camping-3-small.jpg",
        desc:"great beaches and asdasasdas asdas adsdaadas"
    },
    {
        name:"dorset",
        image:"https://coolcamping.com/system/boxes/1136/dorset-campsites-camping-in-dorset-small.jpg",
        desc:"great green lands and gift of mother nature and asdasasdas asdas adsdaadas"
    },
    {
        name:"lake district",
        image:"https://coolcamping.com/system/boxes/637/lake-district-cumbria-campsites-small.jpg",
        desc:"lake district feels to be closer to nature  thus u feel closer to urself and find things imaportant to u"
    }
    ];


function seeddb(){
    campground.remove({},function(){
        // if(err){
        //     console.log(err);
        // }else{
        //     console.log("data removed");
        //     data.forEach(function(seed){
        //     campground.create(seed,function(err,seed){
        //       if(err){
        //           console.log(err);
        //       }else{
                  
        //           console.log(seed);
        //           comment.create({
        //               text    : "this a beautiful place a must visit for a family vacation",
        //               author  : "hemsey"
        //           },function(err,comment){
        //               if(err){
        //                   console.log(err);
        //               }else{
        //                   console.log("comment added");
        //                   seed.comments.push(comment);
        //                   seed.save();
        //               }
        //           })
        //       }
        //   });  
        // });
        //}
    });
    
    
    
}




module.exports = seeddb ;