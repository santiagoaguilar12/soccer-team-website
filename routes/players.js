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

router.get("/new", function(req,res){
    res.render("players/new");
})

router.post("/", function(req,res){
    console.log("*******************************************************");
    console.log(req.body);
    console.log("*******************************************************");
    for(var p in req.body.person){

    	if(req.body.person[p] ===""){
        delete req.body.person[p];  
        }
        
    };
    connection.query('INSERT INTO persons SET ?', req.body.person, function(err, result) {
              if (err) throw err;
              var person_id_result=result.insertId;
              console.log(result);
              req.body.athlete.person_id =person_id_result;
              for(var p in req.body.athlete){

                if(req.body.athlete[p] ===""){
                	    delete req.body.athlete[p];
                    }
                    
                };
              connection.query('INSERT INTO athletes SET ?', req.body.athlete, function(err, result) {
                  if (err) throw err;
                  if(req.body.student){
                         req.body.student.person_id=person_id_result;
                          for(var p in req.body.athlete){

                                if(req.body.student[p] ===""){
                                	    delete req.body.student[p];
                                    }
                                
                            };
                         connection.query('INSERT INTO students SET ?', req.body.student, function(err, result) {
                          if (err) throw err;
                        //   console.log(result);
                        });
                  }
                  console.log(result);
                });
        });
        

    res.redirect("/players");
});


router.get("/:id", function(req, res){
    var id=req.params.id;
    var q="SELECT * FROM persons JOIN athletes ON persons.id = athletes.person_id LEFT JOIN students ON persons.id = students.person_id WHERE persons.id ="+id+" ;";
        q+="SELECT * FROM accomplishments WHERE person_id =" +id+";";
     connection.query(q,function(err, result) {
      if (err) throw err;
      
      var foundPlayer=result[0][0];
      var foundAccomplishments=result[1];
            console.log(foundPlayer);

      console.log(foundAccomplishments);
        //  res.send("You've reached the home page. There are "+count+" users");
        //  console.log(foundPlayer);
        res.render("players/show",{player:foundPlayer, accomplishments:foundAccomplishments});

    });
});

module.exports = router;//exports routes to main app.js file