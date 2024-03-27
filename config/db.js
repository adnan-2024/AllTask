const mysql=require("mysql");

const dbConn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'test',
    database :'registration',
    multipleStatements:true,
    port:3306},function(err){
         if(!err) {console.log(err)}
         else{ console.log('Error connecting to Db')
     }});
module.exports=dbConn;