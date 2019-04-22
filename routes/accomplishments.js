module.exports = function(app,mysql,connection,passport, middlewareObj){
    
    app.get(["/players/:id/accomplishments/new","/coaches/:id/accomplishments/new"],middlewareObj, function(req,res){
        var person_id = req.params.id;
        console.log("#################################################################");
        console.log(req.originalUrl);
                console.log(req.url);
                                console.log(req.path);
        var q = "SELECT * FROM persons where id = "+ person_id;
        connection.query(q,function(err, result) {
              if (err) throw err;
              var person=result[0];
                //  res.send("You've reached the home page. There are "+count+" users");
                //  console.log(person);
                //  console.log("id:"+ person.id);
                console.log("role:"+ person.role);

                res.render("accomplishments/new",{person:person});
        
         });
        // res.send("This is the new acc page"+person_id)
    })
    
    app.post(["/players/:id/accomplishments","/coaches/:id/accomplishments"],middlewareObj,function(req,res){
        console.log(req.body+"$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        console.log(req.originalUrl);
                console.log(req.url);
                                console.log(req.path);



        for(var p in req.body.accomplishment){

        	if(req.body.accomplishment[p] ===""){
            delete req.body.accomplishment[p];  
            }
            
        };
        req.body.accomplishment.person_id = req.params.id;
        console.log(req.body);
        connection.query("INSERT INTO accomplishments SET ?", req.body.accomplishment, function(err,result){
            if (err) throw err;
        })
        req.flash("success", "You have succesfully created an accomplishment");

        if(req.originalUrl.includes("coaches")){
                    res.redirect("/coaches/" + req.params.id);

        }else if(req.originalUrl.includes("players")){
                    res.redirect("/players/" + req.params.id);
        }else{
                    res.redirect("/");

        }
    })

    app.get(["/players/:id/accomplishments/:acc_id/edit","/coaches/:id/accomplishments/:acc_id/edit"],middlewareObj, function(req,res){
        var person_id = req.params.id;
        var acc_id = req.params.acc_id;
        // console.log("#################################################################");
        // console.log(req.originalUrl);
        //         console.log(req.url);
        //                         console.log(req.path);
        var q = "SELECT * FROM persons where id = "+ person_id + "; ";
        q+= "SELECT * FROM accomplishments where id = "+ acc_id + " AND person_id = " +person_id+" ;";
        connection.query(q,function(err, result) {
              if (err) throw err;
            //   console.log(result);
              var person=result[0][0];
              var accomplishment=result[1][0];
                //  res.send("You've reached the home page. There are "+count+" users");
                 console.log("person:"+person.id +";"+person.first_name);
                 console.log('accomplishment:'+accomplishment.id+";"+accomplishment.name_acc);
                //  console.log("id:"+ person.id);
                // console.log("role:"+ person.role);

                res.render("accomplishments/edit",{person:person,accomplishment:accomplishment});
        
         });
        // res.send("This is the new acc page"+person_id)
    });

    app.put(["/players/:id/accomplishments/:acc_id","/coaches/:id/accomplishments/:acc_id"],middlewareObj,function(req,res){
        var person_id = req.params.id;
        console.log("person:"+person_id);
        var acc_id = req.params.acc_id;
        console.log("acc:"+acc_id);
        for(var p in req.body.accomplishment){

        	if(req.body.accomplishment[p] ===""){
            delete req.body.accomplishment[p];  
            }            
        };
        console.log("accomp:"+req.body.accomplishment.name_acc+";"+req.body.accomplishment.date_acc+";"+req.body.accomplishment.text_acc);
        connection.query("UPDATE accomplishments SET ? WHERE id = ?", [req.body.accomplishment,acc_id], function(err,result){
            if (err) throw err;
        })
        req.flash("success", "You have succesfully edited an accomplishment");

        if(req.originalUrl.includes("coaches")){
            res.redirect("/coaches/" + req.params.id );

        }else if(req.originalUrl.includes("players")){
                    res.redirect("/players/" + req.params.id);
        }else{
                    res.redirect("/");
        }
    });

    app.delete(["/players/:id/accomplishments/:acc_id","/coaches/:id/accomplishments/:acc_id"],middlewareObj,function(req,res){
        var acc_id = req.params.acc_id;
        var q = "DELETE FROM accomplishments WHERE id = "+ acc_id+";";
        connection.query(q, function(err, result) {
            if (err) throw err;
        });
        req.flash("success", "You have succesfully deleted an accomplishment");
 
        if(req.originalUrl.includes("coaches")){
            res.redirect("/coaches/" + req.params.id );

        }else if(req.originalUrl.includes("players")){
                    res.redirect("/players/" + req.params.id);
        }else{
                    res.redirect("/");
        }
    });

}





// module.exports = app;//exports routes to main app.js file