// var faker = require("faker");
var mysql = require("mysql");
var express= require("express");
var session  = require('express-session');
var cookieParser = require('cookie-parser');
// var morgan = require('morgan');
var app     =express();
var methodOverride= require("method-override");//needed for put and delete requests
var bodyParser= require("body-parser");
// var port     = process.env.PORT || 8080;
var passport = require('passport');
var flash    = require('connect-flash');

require('./config/passport')(passport); // pass passport for configuration

// var playerRoutes    = require("./routes/players"),//requires each route. Onlye the first step of refactoring clean up app.js
var     coachRoutes = require("./routes/coaches");
//     connection = require('./routes/db');
 var connection = require('./routes/db');   
    
// app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)    
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));//uses method override and sets the key that will be used to override requests. (normally "_method")

// required for passport
app.use(session({
	secret: 'idkwhatiamdoing',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// var connection=mysql.createConnection({
//     host    :"localhost",
//     user    :"santiagoaguilar",
//     database:"soccer_site"
// });

app.use(function(req, res, next){//middleware that gives all routes access to current user object
   res.locals.currentUser = req.user; 
//   res.locals.error   = req.flash("error");//gives all routes/views access to erro message variable
    // res.locals.success   = req.flash("success");//gives all routes/views access to success message variable

   next();
});


app.get("/",function(req,res){
   res.render("home");
});





// app.post("/register", function(req,res){
//     //inserting data dynamically
//         var person = {
//             email: req.body.email
//             };
        
//         connection.query('INSERT INTO users SET ?', person, function(err, result) {
//           if (err) throw err;
//         //   console.log(result);
//         });

//     // console.log("post register: "+req.body.email);
//     res.redirect("/");
// })

// app.get("/joke", function(req,res){
//     var joke="And the lord said unto John, 'Come forth and you will receive eternal life'. John came fifth and won a toaster.";
//     res.send(joke);
// })

// app.get("/random", function(req, res) {
//     var num=Math.floor(Math.random()*10) + 1;
//     res.send("Random number is: "+num);
// })

// app.use("/players", playerRoutes);//for refactoring. first part is the part that all routes have in common. Uses routes variables defined above
app.use("/coaches", coachRoutes);//for refactoring. first part is the part that all routes have in common. Uses routes variables defined above
require('./routes/players.js')(app,mysql,connection,passport); // load our routes and pass in our app and fully configured passport
require('./routes/auth.js')(app,mysql,connection,passport);
app.listen(process.env.PORT, process.env.IP, function(){//starts server. 
    //process.env.PORT--> uses whatever port is in the environment variable PORT 
    //process.env.ID-->uses whatever IP is in the environment variable ID 
    
   console.log("The Soccer Site Server Has Started!");//notnnecesary. just to make sure it starts
});