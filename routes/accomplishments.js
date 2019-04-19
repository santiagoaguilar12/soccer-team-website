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
        if(req.originalUrl.includes("coaches")){
                    res.redirect("/coaches/" + req.params.id);

        }else if(req.originalUrl.includes("players")){
                    res.redirect("/players/" + req.params.id);
        }else{
                    res.redirect("/");

        }
    })

}





// module.exports = app;//exports routes to main app.js file