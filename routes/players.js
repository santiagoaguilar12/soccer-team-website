module.exports = function(app,mysql,connection,passport,middlewareObj){
    
   app.get("/players/",function(req,res){
    var q = "SELECT * FROM persons JOIN athletes ON persons.id = athletes.person_id ";
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    if(req.query.filter && req.query.filter != "none"){
        q+="WHERE team = '"+req.query.filter+"'";
    }
    if(req.query.sort){
        q+=" ORDER BY "+req.query.sort;
    }else{
        q+=" ORDER BY last_name;";
    }
    if(!req.query.view){
        req.query.view = "cards";
        console.log(req.query.view);
    }
    console.log(req.query);
    
    connection.query(q,function(err, result) {
      if (err) throw err;
      var players=result;
        //  res.send("You've reached the home page. There are "+count+" users");
         console.log(players);
        res.render("players/players",{players:players, sort:req.query.sort, filter: req.query.filter,view:req.query.view});

    });
});

app.get("/players/new",middlewareObj, function(req,res){
    res.render("players/new");
})

app.post("/players/",middlewareObj, function(req,res){
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
                          for(var p in req.body.student){

                                if(req.body.student[p] ===""){
                                	    delete req.body.student[p];
                                    }
                            };
                            // var student_no_key = Object.assign({}, req.body.student);
                            // delete student_no_key.person_id;
                            // console.log(req.body.student);
                            // console.log("////////");
                            // console.log(student_no_key);
                         connection.query('INSERT INTO students SET ?', req.body.student, function(err, result) {
                          if (err) throw err;
                        //   console.log(result);
                        });
                  }

                  console.log(result);
                });
        });
        
        req.flash("success", "You have succesfully added a player");

    res.redirect("/players");
});


app.get("/players/:id", function(req, res){
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

app.get("/players/:id/edit",middlewareObj, function(req, res) {
    var id=req.params.id;
    var q="SELECT * FROM persons JOIN athletes ON persons.id = athletes.person_id LEFT JOIN students ON persons.id = students.person_id WHERE persons.id ="+id+" ;";
        // q+="SELECT * FROM accomplishments WHERE person_id =" +id+";";
     connection.query(q,function(err, result) {
      if (err) throw err;
      
      var foundPlayer=result[0];
    //   var foundAccomplishments=result[1];
            console.log(foundPlayer);

    //   console.log(foundAccomplishments);
        //  res.send("You've reached the home page. There are "+count+" users");
        //  console.log(foundPlayer);

        res.render("players/edit",{player:foundPlayer});

    });
});

app.put("/players/:id",middlewareObj, function(req,res){
    var id=req.params.id;
     for(var p in req.body.person){

    	if(req.body.person[p] ===""){
        delete req.body.person[p];  
        }
        
    };
    connection.query('UPDATE persons SET ? WHERE persons.id = ?', [req.body.person, id], function(err, result) {
              if (err) throw err;
            //   var person_id_result=result.insertId;
              console.log(result);
            //   req.body.athlete.person_id =person_id_result;
              for(var p in req.body.athlete){

                if(req.body.athlete[p] ===""){
                	    delete req.body.athlete[p];
                    }
                    
                };
              connection.query('UPDATE athletes SET ? WHERE athletes.person_id = ?', [req.body.athlete, id], function(err, result) {
                  if (err) throw err;
                  if(req.body.student){
                         req.body.student.person_id=id;
                          for(var p in req.body.student){

                                if(req.body.student[p] ===""){
                                	    delete req.body.student[p];
                                    }
                                
                            };
                             var student_no_key = Object.assign({}, req.body.student);
                            delete student_no_key.person_id;
                            console.log(req.body.student);
                            console.log("////////");
                            console.log(student_no_key);
                            // console.log(req.body.student);
                         connection.query('INSERT INTO students SET ? ON DUPLICATE KEY UPDATE ?', [req.body.student,student_no_key], function(err, result) {
                          if (err) throw err;
                        //   console.log(result);
                        });
                  }
                  console.log("result::::::::::"+result);
                });
        });
        
    req.flash("success", "You have succesfully edited a player");

    res.redirect("/players/"+id);
});

app.delete("/players/:id",middlewareObj,function(req,res){
    var id=req.params.id;
    var q="DELETE FROM persons WHERE id = "+id+" ;";
    connection.query(q, function(err, result) {
        if (err) throw err;
    });
            req.flash("success", "You have succesfully deleted a player");

    res.redirect("/players");
}); 


}





// module.exports = app;//exports routes to main app.js file