const dbCon = require('../config/db.js');
let resultperpage=10;
const getstudentAttendence=(req,res)=>{
try {
    let  month=req.query.month?req.query.month:12;
    let q=` SELECT COUNT(*) FROM  StudentMaster_task6 AS sm JOIN AttendenceMaster_task7 AS am ON sm.student_id = am.student_id WHERE MONTH(am.date)=${month} GROUP BY sm.student_id,sm.name`;
  
    dbCon.query(q, (err, result) => {
      if (err) throw err;
      let totalnumberofRecords=result.length;
      let currentpage=req.query.currentpage?Number(req.query.currentpage):1;
      let offset=(currentpage-1)*resultperpage;
      let numberofPages=Math.ceil(totalnumberofRecords / resultperpage);
   
      let query1=`SELECT sm.student_id,sm.name,COUNT(CASE WHEN am.present_or_absent = 1 THEN 1 END) AS total_present_days,(COUNT(CASE WHEN am.present_or_absent = 1 THEN 1 END) / COUNT(am.date)) * 100 AS percentage_attendance FROM  StudentMaster_task6 AS sm JOIN AttendenceMaster_task7 AS am ON sm.student_id = am.student_id WHERE MONTH(am.date)=${month} GROUP BY sm.student_id,sm.name LIMIT ${offset},${resultperpage}`;
      dbCon.query(query1,(err,resultdata)=>{
        if(err){
           
            return res.json(err);
          }
          
          res.render("task7_showattendence",{data:resultdata,currentpage,numberofPages,month})
      })
  
  });
} catch (error) {
    
}
}

const getStudentResults=(req,res)=>{
    try {

        let query=`select COUNT(*) from StudentMaster_task6 as sm left join ExamMaster_task7 as em on sm.student_id=em.SID where exam_type="TERMINAL" group by student_id,exam_type`;

        dbCon.query(query,(err,resultdata)=>{
          if(err){
            return res.json(err);
             
            }
            let totalnumberofRecords=resultdata.length;
            
            let currentpage=req.query.currentpage?Number(req.query.currentpage):1;
            let offset=(currentpage-1)*resultperpage;
            let numberofPages=Math.ceil(totalnumberofRecords / resultperpage);
            let quer=`select sm.student_id,sm.name,SUM(theory_obtain_marks) AS terminal_theory_marks,SUM(practial_obtain_marks) AS terminal_practical_marks from StudentMaster_task6 as sm left join ExamMaster_task7 as em on sm.student_id=em.SID where exam_type="TERMINAL" GROUP By sm.student_id,sm.name LIMIT ${offset},${resultperpage}`;
            let quer2=`select  SUM(theory_obtain_marks) AS prelim_theory_marks,SUM(practial_obtain_marks) AS prelim_practical_marks from StudentMaster_task6 as sm left join ExamMaster_task7 as em on sm.student_id=em.SID where exam_type="PRELIM"  GROUP By sm.student_id,sm.name LIMIT ${offset},${resultperpage}`;
            let quer3=`select SUM(theory_obtain_marks) AS final_theory_marks,SUM(practial_obtain_marks) AS final_practical_marks from StudentMaster_task6 as sm left join ExamMaster_task7 as em on sm.student_id=em.SID where exam_type="FINAL"  GROUP By sm.student_id,sm.name LIMIT ${offset},${resultperpage}`;
            dbCon.query(`${quer};${quer2};${quer3}`,(err,result)=>{
              if(err){
                 
                return res.json(err);
              }
              
              res.render("task7_showresult",{terminaldata:result[0],prelimdata:result[1],finaldata:result[2],currentpage,numberofPages,total_terminal_theorymarks:0})
      
      
            });
            
          
        
        })
        
    } catch (error) {
        console.log(error)
    }

}

const getSingleResult=(req,res)=>{
    try {
        const student_id=req.query.student_id;
console.log(student_id);
  let query=`select * from StudentMaster_task6 as sm left join ExamMaster_task7 as em on sm.student_id=em.SID  left join SubjectMaster_task7 as subm on em.SUBID=subm.subject_id where exam_type="TERMINAL"  AND student_id=${student_id}`;
  let query2=`select * from StudentMaster_task6 as sm left join ExamMaster_task7 as em on sm.student_id=em.SID left join SubjectMaster_task7 as subm on em.SUBID=subm.subject_id	where exam_type="PRELIM" AND student_id=${student_id}`;
  let query3=`select * from StudentMaster_task6 as sm left join ExamMaster_task7 as em on sm.student_id=em.SID left join SubjectMaster_task7 as subm on em.SUBID=subm.subject_id  where exam_type="FINAL" AND student_id=${student_id}`;
 

  dbCon.query(`${query};${query2};${query3}`,(err,resultdata)=>{
    if(err){
      return res.json(err);
       
      }
   
 res.render("task7_singleresult",{terminaldata:resultdata[0],prelimdata:resultdata[1],finaldata:resultdata[2],totalmarks:0});
  })
        
    } catch (error) {
        
    }
}
module.exports={getstudentAttendence,getStudentResults,getSingleResult}