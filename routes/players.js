var express = require("express"),//requires express
    router  = express.Router(),//uses router instead of app for express
    mysql = require("mysql"),
    connection = require('./db');



router.get("/",function(req,res){
    var q = "SELECT * FROM persons JOIN athletes ON persons.id = athletes.person_id;";
    connection.query(q,function(err, result) {
      if (err) throw err;
      var players=result;
        //  res.send("You've reached the home page. There are "+count+" users");
         console.log(players);
        res.render("players/players",{players:players});

    });
});

router.get("/:id", function(req, res){
    var id=req.params.id;
    var q="SELECT * FROM persons JOIN athletes ON persons.id = athletes.person_id LEFT JOIN students ON persons.id = students.person_id WHERE persons.id ="+id+" ;";
     connection.query(q,function(err, result) {
      if (err) throw err;
      var foundPlayer=result[0];
        //  res.send("You've reached the home page. There are "+count+" users");
         console.log(foundPlayer);
        res.render("players/show",{player:foundPlayer});

    });
});

module.exports = router;//exports routes to main app.js file