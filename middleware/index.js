

// // route middleware to make sure
// middlewareObj.isLoggedIn = function(req, res, next) {

// 	// if user is authenticated in the session, carry on
// 	if (req.isAuthenticated() && req.user.admin === 1){
// 				return next();

// 	} else if(req.isAuthenticated()){
// 		req.flash("error", "You must be an approved Administrator to perform that action");
// 	} else{
// 		req.flash("error", "You must be logged in as an Administrator")
// 	}

// 	// if they aren't redirect them to the home page
// 	res.redirect('back');
// };

module.exports= function(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated() && req.user.admin === 1){
				return next();

	} else if(req.isAuthenticated()){
		req.flash("error", "You must be an approved Administrator to perform that action");
	} else{
		req.flash("error", "You must be logged in as an Administrator")
	}

	// if they aren't redirect them to the home page
	res.redirect('back');
};