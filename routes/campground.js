var express = require("express");
var router  = express.Router();
var campground = require("../models/campgrounds");
var middlewareObj = require("../middleware");


router.get("/campgrounds",function(req,res){
		campground.find({},function(err,campgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campground/campground",{campgrounds:campgrounds});
			console.log(campgrounds);
		}
	});
});

router.post("/campgrounds",middlewareObj.isloggedin,function(req,res){
	var image = req.body.image;
	var name  = req.body.name;
	var desc  = req.body.desc;
	var author = {
		id      : req.user._id,
		username: req.user.username
	};
	var newcamp = {name:name,image:image,desc:desc,author:author};
	// campgrounds.push(newcamp);
//	console.log(newcamp)
	campground.create(newcamp,function(err,newone){
		if(err){
			console.log(err);
		}else{
			console.log(newone);
			res.redirect("/campgrounds");
		}
	});
});

router.get("/campgrounds/new",middlewareObj.isloggedin,function(req,res){
	res.render("campground/new");
});

router.get("/campgrounds/:id",function(req,res){
	campground.findById(req.params.id).populate("comments").exec(function(err,foundcamp){
		if(err){
			console.log(err);
		}else{
			console.log(foundcamp);
			res.render("campground/show",{campground:foundcamp});
			
		}
	});
});

router.get("/campgrounds/:id/edit",middlewareObj.isAuthorized,function(req,res){
	campground.findById(req.params.id,function(err,foundcamp){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.render("campground/edit",{foundcamp:foundcamp});
		}
	});
});
router.put("/campgrounds/:id",middlewareObj.isAuthorized,function(req,res){
	campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,foundcamp){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});
router.delete("/campgrounds/:id",middlewareObj.isAuthorized,function(req,res){
	campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	})	;
});

module.exports  = router;