// var faker = require("faker");
var mysql = require("mysql");
var express= require("express");
var app     =express();
var bodyParser= require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));


var connection=mysql.createConnection({
    host    :"localhost",
    user    :"santiagoaguilar",
    database:"soccer_site"
});

app.get("/",function(req,res){
    res.send("home page");
});

// app.get("/", function(req,res){
//     var q="SELECT COUNT(*) AS count FROM users ";
//     connection.query(q,function(err, result) {
//       if (err) throw err;
//       var count=result[0].count;
//         //  res.send("You've reached the home page. There are "+count+" users");
         
//         res.render("home",{count:count});

//     });
// });


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


app.listen(process.env.PORT, process.env.IP, function(){//starts server. 
    //process.env.PORT--> uses whatever port is in the environment variable PORT 
    //process.env.ID-->uses whatever IP is in the environment variable ID 
    
   console.log("The Soccer Site Server Has Started!");//notnnecesary. just to make sure it starts
});