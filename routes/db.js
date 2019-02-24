var mysql = require("mysql");



var connection=mysql.createConnection({
    host    :"localhost",
    user    :"santiagoaguilar",
    database:"soccer_site"
});

module.exports = connection;