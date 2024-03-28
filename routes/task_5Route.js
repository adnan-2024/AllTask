const express = require('express');
const router = express.Router();
const dbCon = require('../config/db.js');

const resultPerPage=200;


router.get('/users',(req,res)=>{
   const q="SELECT  * FROM StudentMaster_task5 LIMIT 30000";
    dbCon.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        }
      
        const numberofResult=data.length;
        const numberofPages=Math.ceil(numberofResult /resultPerPage );
        let currentpage=req.query.currentpage?Number(req.query.currentpage):1;
       
        const startingLimit= (currentpage -1)* resultPerPage;
        let query=`SELECT *FROM  StudentMaster_task5 LIMIT ${startingLimit},${resultPerPage}`;
        dbCon.query(query, (err, result)=>{
            if(err) throw err;
            res.render('task5_showusers', {data: result, currentpage, numberofPages});
           
        });
       
   
    });
   
});


module.exports = router;