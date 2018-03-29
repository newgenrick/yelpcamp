var express = require("express");
var router  = express.Router();
var campground = require("../models/campgrounds");
var comment    = require("../models/comments");
var middlewareObj = require("../middleware");

router.get("/campgrounds/:id/comment/new",middlewareObj.isloggedin,function(req,res){
	campground.findById(req.params.id,function(err,foundcamp){
		if(err){
			console.log(err);
		}else{
			console.log(foundcamp);
			res.render("comment/new",{campground:foundcamp});
			
		}
	});
	
});

router.post("/campgrounds/:id/comment",function(req,res){
	
	campground.findById(req.params.id,function(err,foundcamp){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			comment.create(req.body.comment,function(err,comment){
				if(err){
					res.redirect("/campgrounds");
				}else{
					comment.author.id       = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					foundcamp.comments.push(comment);
					foundcamp.save();
					res.redirect("/campgrounds/" + foundcamp._id);
				}
			});
			
		}
	});
	
});

router.get("/campgrounds/:id/comment/:commentid/edit",middlewareObj.isComAuthorized,function(req,res){
	comment.findById(req.params.commentid,function(err,comment){
				if(err){
					console.log(err)
					res.redirect("back");
				}else{
					res.render("comment/edit",{campid:req.params.id,comment:comment});
				}
			});
	
});

router.put("/campgrounds/:id/comment/:commentid",middlewareObj.isComAuthorized,function(req,res){
	comment.findByIdAndUpdate(req.params.commentid,req.body.comment,function(err,foundcomment){
		if(err){
			console.log(err);
			res.redirect("/campgrounds/" + req.params.id);
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});


router.delete("/campgrounds/:id/comment/:commentid/delete",middlewareObj.isComAuthorized,function(req,res){
	comment.findByIdAndRemove(req.params.commentid,function(err){
		if(err){
			req.flash("error",err.message);
			res.redirect("/campgrounds/"+req.params.id);
		}else{
			req.flash("success","successfuly removed comment")
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});



module.exports = router;