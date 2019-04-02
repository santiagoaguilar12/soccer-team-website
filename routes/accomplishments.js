module.exports = function(app,mysql,connection,passport){
    
    app.get("/players/:id/accomplishments/new", function(req,res){
        var person_id = req.params.id;
        var q = "SELECT * FROM persons where id = "+ person_id;
        connection.query(q,function(err, result) {
              if (err) throw err;
              var person=result;
                //  res.send("You've reached the home page. There are "+count+" users");
                //  console.log(players);
                res.render("accomplishments/new",{person:person});
        
         });
        // res.send("This is the new acc page"+person_id)
    })

}





// module.exports = app;//exports routes to main app.js file