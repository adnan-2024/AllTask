const express=require("express");
const app=express();
const path=require("path");
const authenticationroute=require("./routes/authentication.js");
const userRoute=require("./routes/userRoute.js");
const jstaskRoute=require("./routes/jstaskRoute.js");
var cookieParser = require('cookie-parser');
const dotenv=require("dotenv");
dotenv.config();



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(authenticationroute);
app.use(userRoute);
app.use(jstaskRoute)
app.use((err,req,res,next)=>{
    
     const statuscode=err.statusCode;
     const message=err.message;
     return res.status(statuscode).json({
         success:false,
         statuscode,
         message
     })
  
  })


app.listen(8800,(req,res)=>{
    console.log("Server is running on Port 8800")
});
