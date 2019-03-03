var express = require("express"),//requires express
    router  = express.Router(),//uses router instead of app for express
    mysql = require("mysql"),
    connection = require('./db');
    
router.get("/",function(req,res){
    var q = "SELECT * FROM persons JOIN coaches ON persons.id = coaches.person_id;";
    connection.query(q,function(err, result) {
      if (err) throw err;
      var coaches=result;
        //  res.send("You've reached the home page. There are "+count+" users");
         console.log(coaches);
        res.render("coaches/coaches",{coaches:coaches});

    });
});

router.get("/:id", function(req, res){
    var id=req.params.id;
    var q="SELECT * FROM persons JOIN coaches ON persons.id = coaches.person_id WHERE persons.id ="+id+" ;";
    q+="SELECT * FROM accomplishments WHERE person_id =" +id+";";
     connection.query(q,function(err, result) {
      if (err) throw err;
      var foundCoach=result[0][0];
      var foundAccomplishments=result[1];

        //  res.send("You've reached the home page. There are "+count+" users");
         console.log(foundCoach);
        res.render("coaches/show",{coach:foundCoach, accomplishments:foundAccomplishments});

    });
});


module.exports = router;//exports routes to main app.js file