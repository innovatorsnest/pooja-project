
var mysql = require('mysql');
var connection = mysql.createConnection({
   host : 'localhost',
   user : 'root',
   password : 'password',
   database : 'sample'
 }); 
connection.connect(); 

module.exports = connection;