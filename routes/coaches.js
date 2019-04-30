module.exports = function(app,mysql,connection,passport,middlewareObj){

    app.get("/coaches/", function(req,res){
        var q = "SELECT * FROM persons JOIN coaches ON persons.id = coaches.person_id ";
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
        console.log("???????????????????????");
        console.log(q);
        connection.query(q,function(err, result) {
          if (err) throw err;
          var coaches=result;
            //  res.send("You've reached the home page. There are "+count+" users");
             console.log(coaches);
            res.render("coaches/coaches",{coaches:coaches,sort:req.query.sort, filter: req.query.filter, view:req.query.view});
    
        });
    });
    app.get("/coaches/new",middlewareObj, function(req,res){
        // res.send("HI");
        res.render("coaches/new");
    });
    
    app.post("/coaches/",middlewareObj, function(req,res){
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
                  req.body.coach.person_id =person_id_result;
                  for(var p in req.body.coach){
    
                    if(req.body.coach[p] ===""){
                            delete req.body.coach[p];
                        }
                        
                    };
                  connection.query('INSERT INTO coaches SET ?', req.body.coach, function(err, result) {
                      if (err) throw err;
                     
                      console.log(result);
                    });
            });
            
        req.flash("success", "You have succesfully added a coach");
    
        res.redirect("/coaches");
    });
    
    app.get("/coaches/:id", function(req, res){
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
    
    
    app.get("/coaches/:id/edit",middlewareObj, function(req, res) {
        var id=req.params.id;
        var q="SELECT * FROM persons JOIN coaches ON persons.id = coaches.person_id  WHERE persons.id ="+id+" ;";
            // q+="SELECT * FROM accomplishments WHERE person_id =" +id+";";
         connection.query(q,function(err, result) {
          if (err) throw err;
          
          var foundCoach=result[0];
        //   var foundAccomplishments=result[1];
                console.log(foundCoach);
    
        //   console.log(foundAccomplishments);
            //  res.send("You've reached the home page. There are "+count+" users");
            //  console.log(foundPlayer);
            res.render("coaches/edit",{coach:foundCoach});
    
        });
    });
    
    app.put("/coaches/:id",middlewareObj, function(req,res){
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
                  for(var p in req.body.coach){
    
                    if(req.body.coach[p] ===""){
                            delete req.body.coach[p];
                        }
                        
                    };
                  connection.query('UPDATE coaches SET ? WHERE coaches.person_id = ?', [req.body.coach, id], function(err, result) {
                      if (err) throw err;
                      
                      console.log(result);
                    });
            });
            
        req.flash("success", "You have succesfully edited a coach");
    
        res.redirect("/coaches/"+id);
    })
    
    app.delete("/coaches/:id",middlewareObj,function(req,res){
        var id=req.params.id;
        var q="DELETE FROM persons WHERE id = "+id+" ;";
        connection.query(q, function(err, result) {
            if (err) throw err;
        });
        req.flash("success", "You have succesfully deleted a coach");
    
        res.redirect("/coaches");
    });
    
}

    


