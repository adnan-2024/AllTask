const express=require("express");
const app=express();
const path=require("path");
const authenticationroute=require("./routes/authentication.js");
const userRoute=require("./routes/userRoute.js");
const paginationRoute=require("./routes/task_5Route.js");
const filterationRoute=require("./routes/task6_Route.js");
const task7Route=require("./routes/task7Route.js");
const task8Route=require("./routes/task8Route.js");
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
app.use(jstaskRoute);
app.use('/pagination',paginationRoute);
app.use('/filteration',filterationRoute);
app.use('/task7',task7Route);
app.use('/dynamicgrid',task8Route);
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
