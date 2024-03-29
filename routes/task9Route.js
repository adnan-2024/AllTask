const express = require('express');
const router = express.Router();
const dbCon = require('../config/db.js');
const verifyToken = require('../utils/verifyToken.js');
let resultperpage=120;

router.get('/getStudentAttendence',verifyToken,(req,res)=>{
 
    let q=`SELECT * FROM StudentMaster_task9`;
    dbCon.query(q, (err, result) => {
      if (err) throw err;
      let totalnumberofRecords=result.length;
      let currentpage=req.query.currentpage?Number(req.query.currentpage):1;
      let offset=(currentpage-1)*resultperpage;
      let numberofPages=Math.ceil(totalnumberofRecords / resultperpage);
   
      let query1=`SELECT * FROM StudentMaster_task9 LIMIT ${offset},${resultperpage}`;
      dbCon.query(query1,(err,resultdata)=>{
        if(err){
           
            return res.json(err);
          }
        
          
          res.render("task9_showattendence",{data:resultdata,currentpage,numberofPages})
      })
  
  });
  
});
// route for search
router.post('/getStudentAttendence',verifyToken,(req,res)=>{

  let q=`SELECT * FROM StudentMaster_task9`;
 let search=req.body.searchstudent || "";
 let search_name =req.body.search_name || "";
 let search_designation=req.body.search_designation ||"";
 let search_city=req.body.search_city ||"";
 let selectpicker=req.body.selectpicker;
 console.log(search_city);
 console.log(search_designation);

  dbCon.query(q, (err, result) => {
    if (err) throw err;
    let totalnumberofRecords=result.length;
    let currentpage=req.query.currentpage?Number(req.query.currentpage):1;
    let offset=(currentpage-1)*resultperpage;
    let numberofPages=Math.ceil(totalnumberofRecords / resultperpage);
   let query1;
  
   
    if(selectpicker=="OR"){
      console.log("called");
      query1=`SELECT * FROM StudentMaster_task9 WHERE (FIRST_NAME LIKE '${search_name}' OR DESIGNATION LIKE '${search_designation}' OR CITY LIKE '${search_city}' ) LIMIT ${offset},${resultperpage}`;
    }
   else if(selectpicker=="AND"){
    query1=`SELECT * FROM StudentMaster_task9 WHERE (FIRST_NAME LIKE '${search_name}%' AND  DESIGNATION LIKE '${search_designation}' AND  CITY LIKE '${search_city}') LIMIT ${offset},${resultperpage}`;
   }
   else{
    console.log("none");
    query1=`SELECT * FROM StudentMaster_task9 WHERE ( APPLICANTID LIKE '${search}')`;

   }
    dbCon.query(query1,(err,resultdata)=>{
      if(err){
         
          return res.json(err);
        }
      
      
        res.render("task9_showattendence",{data:resultdata,currentpage,numberofPages})
    })

});

});










module.exports = router;