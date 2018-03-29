var campground = require("../models/campgrounds");
var comment    = require("../models/comments");
var middlewareObj = {};


middlewareObj.isloggedin = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","you should be logged in todo that");
	res.redirect("/login");
};

middlewareObj.isAuthorized = function(req,res,next){
	if(req.isAuthenticated()){
		campground.findById(req.params.id,function(err,foundcamp){
			if(err){
				req.flash("error",err.message);
				res.redirect('back');
			}else{
				if(foundcamp.author.id.equals(req.user._id)){
					next();	
				}else{
					req.flash("error","you dont have the permission to do that");
					res.redirect("back");
				}
			}
		});
	}else{
		req.flash("error","you should be logged in todo that");
		res.redirect("back");
	}
};

middlewareObj.isComAuthorized = function(req,res,next){
	if(req.isAuthenticated()){
		comment.findById(req.params.commentid,function(err,foundcomment){
			if(err){
				req.flash("error",err.message);
				res.redirect('back');
			}else{
				if(foundcomment.author.id.equals(req.user._id)){
					next();	
				}else{
					res.redirect("back");
				}
			}
		});
	}else{
		req.flash("error","you should be logged in todo that");
		res.redirect("back");
	}
};

module.exports =  middlewareObj;