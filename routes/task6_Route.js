const express = require('express');
const router = express.Router();
const dbCon = require('../config/db.js');
const verifyToken=require("../utils/verifyToken")

let resultperpage=200
router.get('/filter',verifyToken,(req,res)=>{
   
    dbCon.query("SELECT  * FROM StudentMaster_task5 LIMIT 30000", (err, result) => {
        if (err) throw err;
        let totalnumberofRecords=result.length;
        let currentpage=req.query.currentpage?req.query.currentpage:1;
        let offset=(currentpage-1)*resultperpage;
        let numberofPages=Math.ceil(totalnumberofRecords / resultperpage);
       let sorting_order=req.query.sorting_order;
        const order_by=req.query.order_by;
        console.log("yes 12")
            res.redirect(`users/?currentpage=${currentpage}&order_by=${order_by}&sorting_order=${sorting_order}`);

      });

})
router.get("/users",verifyToken,(req,res)=>{
    dbCon.query("SELECT  * FROM StudentMaster_task5 LIMIT 30000", (err, result) => {
        
        if (err) throw err;
        let totalnumberofRecords=result.length;
        let currentpage=req.query.currentpage?Number(req.query.currentpage):1;
        let offset=(currentpage-1)*resultperpage;
        let numberofPages=Math.ceil(totalnumberofRecords / resultperpage);
        let query=`SELECT * FROM StudentMaster_task5 LIMIT ${offset},${resultperpage}`;
      
     let order_by=req.query.order_by;
     let sorting_order=req.query.sorting_order;
       if(typeof order_by=='undefined'){
        dbCon.query(query,(err,resultdatadb)=>{
            if(err) throw err;

            let resultdata= resultdatadb.map((student)=>{
                student.dob=new Date(student.dob).toISOString().substr(0,10);
              return student;
            });
            res.render("task6_showusers",{data:resultdata,currentpage,numberofPages,order_by});
        })
       }
       else{
        let query1=`SELECT * FROM  StudentMaster_task5 ORDER BY ${order_by} ${sorting_order} LIMIT ${resultperpage}`;
        
        dbCon.query(query1,(err,resultdatadb)=>{
            if(err) throw err;
           
           let resultdata= resultdatadb.map((student)=>{
                student.dob=new Date(student.dob).toISOString().substr(0,10);
              return student;
            });
            
            res.render("task6_showusers",{data:resultdata,currentpage,numberofPages,order_by});
        })
       }
        
  
      });
})






module.exports = router;