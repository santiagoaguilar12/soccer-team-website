module.exports = function(app,mysql,connection,passport) {
    
app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('auth/login', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/register', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('auth/register', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/register', passport.authenticate('local-signup', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/register', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	
		
		app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	app.get("/loggedin", isLoggedIn, function(req,res){
		console.log(req.user);
    // res.send("you are logged in:" + req.user);
    res.render("test");
})
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}