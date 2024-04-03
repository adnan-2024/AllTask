const dbCon = require('../config/db.js');
let resultperpage=100;
const  loadIntialDelimiter=(req,res)=>{
    try{
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
            
              
              res.render("task10_showAttendence",{data:resultdata,currentpage,numberofPages})
          })
      
      });
    }
    catch(error){
        console.log(error);
    }

}
const searchForData=(req,res)=>{
    try {
        let fieldnames=req.body.Fieldname;



        var finalfirstname,final_last_name,finalemail,finaldesignation,final_phone_number,finalcity,finalfirstname2;
        // For getting Firstname
        
        let firstname1=fieldnames.split("_");
        console.log( firstname1);
        let  firstname=firstname1.slice(1).toString();
        
        
        console.log("firstname is",firstname);
        // note that replace method work on only string
        if(firstname){
          let partialfirstname=firstname.replace("^"," ").replace("$"," ").replace("{"," ").replace("}"," ").replace(":"," ");
          console.log("partialfirstname",partialfirstname);
          let finalfirstname1=partialfirstname.split(" ")[0];
          console.log("Finalfirstname1",finalfirstname1)
         finalfirstname=finalfirstname1.split(",")
        
        }
        // For getting lastname
        
        let lastname1=fieldnames.split("^");
        let  lastname=lastname1.slice(1).toString();
        if(lastname){
          let partiallastname=lastname.replace("_"," ").replace("$"," ").replace("{"," ").replace("}"," ").replace(":"," ");
         let  final_last_name1=partiallastname.split(" ")[0];
         final_last_name=final_last_name1.split(",");
        
        }
        // // For getting Email
        let email1=fieldnames.split("$");
        let email=email1.slice(1).toString();
        if(email){
          let partialemail=email.replace("_"," ").replace("^"," ").replace("{"," ").replace("}"," ").replace(":"," ");
         let  finalemail1=partialemail.split(" ")[0];
         finalemail=finalemail1.split(",");
          console.log("final email is",finalemail);
        
        
        }
        // // For getting Designation
        let designation1=fieldnames.split("}");
        let designation=designation1.slice(1).toString();
        if(designation){
          let partialdesignation=designation.replace("_"," ").replace("^"," ").replace("{"," ").replace("$"," ").replace(":"," ");
          console.log(partialdesignation);
          let part1=partialdesignation.split(" ")[0];
          let part2=partialdesignation.split(" ")[1];
          if(part2){
          let finaldesignation1=part1+ " "+part2;
          finaldesignation=finaldesignation1.split(",");
          }else{
           let  finaldesignation2=part1;
           finaldesignation=finaldesignation2.split(",");
          }
          
          console.log("Final designation is",finaldesignation);
        
        
        }
        // For getting Phone Number
        let phonenumber1=fieldnames.split("{");
        let phonenumber=phonenumber1.slice(1).toString();
        if(phonenumber){
          let partialphonenumber=phonenumber.replace("_"," ").replace("^"," ").replace("}"," ").replace("$"," ").replace(":"," ");
          let final_phone_number1=partialphonenumber.split(" ")[0];
          final_phone_number=final_phone_number1.split(",");
          console.log("Final PhonenUmber is:",final_phone_number);
        
        }
        // // // For getting City
        let city1=fieldnames.split(":");
        let city=city1.slice(1).toString();
        if(city){
          let partialcity=city.replace("_"," ").replace("^"," ").replace("}"," ").replace("$"," ").replace(":"," ");
          let finalcity1=partialcity.split(" ")[0];
          finalcity=finalcity1.split(","); 
          console.log("City  is",finalcity);
        
        }
        final_last_name=final_last_name?final_last_name:""
        final_phone_number=final_phone_number?final_phone_number:""
        finalcity=finalcity?finalcity:""
        finalfirstname=finalfirstname?finalfirstname:""
        final_last_name=final_last_name?final_last_name:""
        finaldesignation=finaldesignation?finaldesignation:""
          
        
          let query = 'SELECT * FROM StudentMaster_task9 WHERE ';
        
        
            if (finalfirstname) {
              console.log("called");
                query += `FIRST_NAME   IN('${finalfirstname.join("','")}')`;
                console.log("query is",query);
            }
            if (final_last_name) {
                query += (finalfirstname ? ' AND ' : '') + `LAST_NAME  IN('${final_last_name.join("','")}')`;
            }
            if (finaldesignation) {
                query += ((finalfirstname || final_last_name) ? ' AND ' : '') + `DESIGNATION IN('${finaldesignation.join("','")}')`;
            }
            if (final_phone_number) {
                query += ((finalfirstname || final_last_name || finaldesignation) ? ' AND ' : '') + `PHONE_NUMBER IN('${final_phone_number.join("','")}')`;
            }
            if (finalcity) {
                query += ((finalfirstname || final_last_name || finaldesignation || final_phone_number) ? ' AND ' : '') + `CITY IN('${finalcity.join("','")}')`;
            }
            if (finalemail) {
                query += ((finalfirstname || final_last_name || finaldesignation || final_phone_number || finalcity) ? ' AND ' : '') + `EMAIL IN('${finalemail.join("','")}')`;
            }
        
         
            dbCon.query(query,(err,resultdata)=>{
              if(err){
                 
                  return res.json(err);
                }
              
              
                res.render("task10_showAttendence",{data:resultdata})
            })
        
        
    } catch (error) {
        console.log(error)
    }
}
module.exports={loadIntialDelimiter,searchForData}