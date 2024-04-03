const express=require("express");
const app=express();
const path=require("path");

const userRoute=require("./routes/userRoute.js");


var cookieParser = require('cookie-parser');
const dotenv=require("dotenv");
dotenv.config();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(userRoute);

app.use((err,req,res,next)=>{
    
     const statuscode=err.statusCode;
     const message=err.message;
     return res.status(statuscode).json({
         success:false,
         statuscode,
         message
     })
  
  })
app.use((req,res)=>{
    res.render("errorpage")
})

app.listen(8800,(req,res)=>{
    console.log("Server is running on Port 8800")
});
