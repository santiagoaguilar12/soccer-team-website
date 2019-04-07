var mysql = require("mysql");



var connection=mysql.createConnection({
    host    :"localhost",
    user    :"root",
    database:"soccer_site",
    password:"Santfutbol00!",
    multipleStatements:true
});

module.exports = connection;