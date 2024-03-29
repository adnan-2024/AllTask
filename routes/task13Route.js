const express = require('express');
const dbConn = require('../config/db.js');
const router = express.Router();


router.get("/",(req,res)=>{
  
    res.render("task13_home");
});
router.post('/education-details',(req,res)=>{
console.log("Education Route is calleed");
    const {ssc_board_name,
        ssc_passing_year,
        ssc_percentage,
        hsc_board_name,
        hsc_passing_year,
        hsc_percentage,
        bachelor_course_name,
        bachelor_univercity,
        bachelor_passing_year,
        bachelor_percentage,
        master_course_name,
        master_univercity ,
        master_passing_year,
        master_percentage,}=req.body;
    let id=req.query.userid;
    console.log("id is ",id)
    let ssceduquery = "INSERT INTO SSC_DETAILS(`APPLICANTID`,`NAME_OF_BOARD`,`PASSING_YEAR`,`PERCENTAGE`) VALUES (?)";
            const sscvalues = [id, ssc_board_name,
                ssc_passing_year,
                ssc_percentage,];
            dbConn.query(ssceduquery, [sscvalues], (err, result) => {
                if (err) {
                    return res.send(err);
                }
                console.log("ssc values inserted");
            })
       
            let hsceduquery = "INSERT INTO HSC_DETAILS(`APPLICANTID`,`NAME_OF_BOARD`,`PASSING_YEAR`,`PERCENTAGE`) VALUES (?)";
            const hscvalues = [id, hsc_board_name,
                hsc_passing_year,
                hsc_percentage,];
            dbConn.query(hsceduquery, [hscvalues], (err, result) => {
                if (err) {
                    return res.send(err);
                }
                console.log("hsc values inserted");
            });
            let bacheloreduquery = "INSERT INTO DEGREE_DETAILS(`APPLICANTID`,`COURSENAME`,`UNIVERCITY`,`PASSING_YEAR`,`PERCENTAGE`) VALUES (?)";
            const bachelorvalues = [id,
                bachelor_course_name,
                bachelor_univercity,
                bachelor_passing_year,
                bachelor_percentage,];
            dbConn.query(bacheloreduquery, [bachelorvalues], (err, result) => {
                if (err) {
                    return res.send(err);
                }
                console.log("bachelor values inserted");
            });
            let mastereduquery = "INSERT INTO  MASTER_DETAIL(`APPLICANTID`,`COURSENAME`,`UNIVERCITY`,`PASSING_YEAR`,`PERCENTAGE`) VALUES (?)";
            const mastervalues = [id, master_course_name,
                master_univercity,
                master_passing_year,
                master_percentage,];
            dbConn.query(mastereduquery, [mastervalues], (err, result) => {
                if (err) {
                    return res.send(err);
                }
                console.log("master values inserted");
            });

            res.json({ success: true }); 
          
});

router.post('/basic-details', async(req, res) => {
    try{
        console.log("inside the Basic Details route")
        let { firstname, lastname, designation, current_address, permenant_address, email, city, zip, statedropdown, gender, number, relationdropdown, date } = req.body;
        let basic_detail_values = [firstname, lastname, designation, current_address, permenant_address, email, number, city, zip, statedropdown, gender, date,relationdropdown];
        let query = "INSERT INTO BASIC_DETAILS(`FIRST_NAME`,`LAST_NAME`,`DESIGNATION`,`CURRENT_ADDRESS`,`PERMENANT_ADDRESS`,`EMAIL`,`PHONE_NUMBER`,`CITY`,`ZIP_CODE`,`STATE`,`GENDER`,`DOB`,`RELATIONSHIP_STATUS`) VALUES (?)";
        console.log(query);
        console.log(basic_detail_values);
         dbConn.query(query,[basic_detail_values], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error storing basic details');
            } else {
                console.log('Basic details stored successfully');
                
                res.json({ success: true,userid:result.insertId }); 
               
            }
        });
        
    }
    catch(error){
        console.log(error);
    }
  });
 
router.post('/work-experience',(req,res)=>{
    try{
        console.log("callled workexperience");
        let id=req.query.userid;
        let workexperienceData=req.body;
       
      
          for(let i=0;i<workexperienceData.length;i++){
           let workexpericequery = "INSERT INTO WORK_EXPERIENCE(`APPLICANTID`,`COMANY_NAME`,`DESIGNATION`,`FROM_DATE`,`TO_DATE`) VALUES (?)";
           let work_experience_value_1=[id,workexperienceData[i].companyName,workexperienceData[i].designation,workexperienceData[i].fromDate,workexperienceData[i].toDate];
          
           if(workexperienceData[i].companyName && workexperienceData[i].designation && workexperienceData[i].fromDate && workexperienceData[i].toDate){
           dbConn.query(workexpericequery, [work_experience_value_1], (err, result) => {
                           if (err) {
                               console.log(err);
                           }
                           console.log("values secod row inserted");
                       })
                    }
          }
          res.json({ success: true }); 

    }
    catch(error){
        console.log(error);
    }
})
router.post('/add-language',(req,res)=>{
    try{
        console.log("server addd language")
        let id=req.query.userid;
        console.log("inside language")
        console.log(req.body)
        let language=req.body[0]
        let hindiread=req.body[1]
        let hindiwrite=req.body[2]
        let hindispeak=req.body[3]
        let gujaratiread=req.body[4]
        let gujaratiwrite=req.body[5]
        let gujaratispeak=req.body[6]
        let englishread=req.body[7]
        let englishwrite=req.body[8]
        let englishspeak=req.body[9]
       
           let readarr=[];
           let writearr=[];
           let speakrr=[];
           
           
           readarr.push(hindiread);
           readarr.push(englishread);
           readarr.push(gujaratiread);
           writearr.push(hindiwrite);
           writearr.push(englishwrite);
           writearr.push(gujaratiwrite);
           speakrr.push(hindispeak);
           speakrr.push(englishspeak);
           speakrr.push(gujaratispeak);
           let limitofarr;
          
       
            if(typeof language=="string"){
               limitofarr=1;
               
            }
            if(typeof language=="object")
            {
                limitofarr=language.length;
            }
      let queryvalues;
      
    
            for(let i=0;i<limitofarr;i++){
             let langquery = "INSERT INTO LANGUAGE_KNOWN(`APPLICANTID`,`LANGUAGE`,`READ`,`WRITE`,`SPEAK`) VALUES (?)";
             if(typeof language=="string"){
                 if(language=="hindi"){
                    if(readarr[0]=="read"){
                        readarr[0]=1;
                    }
                    else{
                        readarr[0]=0;
                    }
                    if(writearr[0]=="write"){
                        writearr[0]=1;
                    }
                    else{
                        writearr[0]=0;
                    }
                    if(speakrr[0]=="speak"){
                        speakrr[0]=1;
                    }
                    else{
                        speakrr[0]=0;
                    }
                     queryvalues = [id, language, readarr[0], writearr[0], speakrr[0]];
                 }
                 else if(language=="english"){
                    if(readarr[1]=="read"){
                        readarr[1]=1;
                    }
                    else{
                        readarr[1]=0;
                    }
                    if(writearr[1]=="write"){
                        writearr[1]=1;
                    }
                    else{
                        writearr[1]=0;
                    }
                    if(speakrr[1]=="speak"){
                        speakrr[1]=1;
                    }
                    else{
                        speakrr[1]=0;
                    }
                    queryvalues = [id, language, readarr[1], writearr[1], speakrr[1]];

                 }
                 else{
                    if(readarr[2]=="read"){
                        readarr[2]=1;
                    }
                    else{
                        readarr[2]=0;
                    }
                    if(writearr[2]=="write"){
                        writearr[2]=1;
                    }
                    else{
                        writearr[2]=0;
                    }
                    if(speakrr[2]=="speak"){
                        speakrr[2]=1;
                    }
                    else{
                        speakrr[2]=0;
                    }
                    queryvalues = [id, language, readarr[2], writearr[2], speakrr[2]];
                 }
        console.log("Queryvalues  is",queryvalues);
            }
            else{
                if(readarr[i]=="read"){
                      
                    readarr[i]=1;
                  
                }
                else{
                    console.log("cllllllll");
                    readarr[i]=0;
                    console.log(readarr)
                   
                }
                if(writearr[i]=="write"){
                    writearr[i]=1;
                }
                else{
                    writearr[i]=0;
                }
                if(speakrr[i]=="speak"){
                    speakrr[i]=1;
                }
                else{
                    speakrr[i]=0;
                }
                
                queryvalues = [id, language[i], readarr[i], writearr[i], speakrr[i]];
            }
                     
                             dbConn.query(langquery, [queryvalues], (err, result) => {
                                 if (err) {
                                     next(err);
                                 }
                                 console.log("language checkboxData is inserted");
                             })
            }
            res.json({ success: true }); 
    }
    catch(error){
        console.log(error);
    }
});
router.post('/add-preference',(req,res)=>{
    try{
        let id=req.query.userid;
        console.log("inside preferences")
        console.log(req.body[0][1])

        let preferedlocationdropdown=req.body[0][1];
        let noticeperiod=req.body[1][1];
        let departmentdropdown=req.body[2][1];
        let currentctc=req.body[3][1];
         let expectedctc=req.body[4][1];

        
console.log(preferedlocationdropdown)
console.log(noticeperiod)
console.log(departmentdropdown)
console.log(currentctc);
console.log(expectedctc);
let preferencequery="INSERT INTO  PREFERENCE_DETAIL(`APPLICANTID`,`PREFERED_LOCATION`,`NOTICE_PERIOD`,`EXPECTED_CTC`,`CURRENT_CTC`,`DEPARTMENT`) VALUES (?)";
let preferencevalues=[id,preferedlocationdropdown,noticeperiod,expectedctc,currentctc,departmentdropdown];
dbConn.query(preferencequery,[preferencevalues],(err,result)=>{
    if(err){
        throw err;
    }
    console.log("preference data is inserted")
;})
      
 
res.json({ success: true }); 

    }
    catch(error){

    }
})
router.post('/add-reference',(req,res)=>{
  
        
  try{
    let id=req.query.userid;
   
    let referenceData=req.body;
            console.log(referenceData.length);               
    
     for(let i=0;i<referenceData.length;i++){
       let referencequery="INSERT INTO REFERENCE_DETAIL(`APPLICANTID`,`NAME`,`CONTACT_NUMBER`,`RELATION`) VALUES (?)"
       let referencequeryvalue =[id,referenceData[i].referencename,referenceData[i].referencecontactnumber,referenceData[i].referecerelation]
       console.log(referencequeryvalue);
       if(referenceData[i].referencename&& referenceData[i].referencecontactnumber && referenceData[i].referecerelation){
    
                      dbConn.query(referencequery,[referencequeryvalue],(err,result)=>{
                               if(err){
                                   next(err);
                               }
                               console.log("reference 1 value is inserted into db");
                           });
                          
                       }
          
     }
     
     
     res.json({ success: true }); 
    }
     catch(error){
        console.log(error);
     }

})

router.post('/add-technology',(req,res)=>{
    try{
    let technologies=[];
    console.log("route is called");
    let id=req.query.userid;
    let php=req.body[0];
    let mysql=req.body[1];
    let laravel=req.body[2];
    console.log(req.body);
    let oracle=req.body[3];
    let phpradio=req.body[4];
    let mysqlradio=req.body[5];
    let laravelradio=req.body[6];
    let oracleradio=req.body[7];
    
if(php){
    

technologies.push({technology:'php',profficiency:phpradio});
}
if(mysql){
technologies.push({technology:'mysql',profficiency:mysqlradio});
}
if(laravel){
console.log("calledd");
technologies.push({technology:'laravel',profficiency:laravelradio});
}
if(oracle){
   
technologies.push({technology:'oracle',profficiency:oracleradio});
}


    let efficiencyarray=[phpradio,mysqlradio,laravelradio,oracleradio];
   let samplearr= technologies.map(tech=>[id,tech.technology,tech.profficiency]);
   console.log("------------------------------------------------>")
   console.log(samplearr);
    for(let i=0;i<technologies.length;i++){
       let techlangquery = "INSERT INTO TECHNOLOGY_KNOWN(`APPLICANTID`,`TECHNOLOGY`,`EFFICIENCY_LEVEL`) VALUES (?)";
            
                       dbConn.query(techlangquery, [samplearr[i]], (err, result) => {
                           if (err) {
                               console.log(err);
                           }
                           console.log("laravel checkboxData is inserted");
                       });
    }
    res.json({ success: true }); 
}

catch(error){
    console.log(error);
}
})

router.get('/cities/:state', (req, res) => {
    console.log("City Routes called");
    const citiesData = {
        gujarat: ['Ahmedabad', 'Surat', 'Vadodara','Bhavnagar','Jamnagr','Valsad','Gandhingar','Junagadh','Valsad','Vapi','Deesa','Jetpur'],
        rajasthan: ['Jaipur', 'Udaipur', 'Jodhpur','Kota','Ajmer','jaisalmer'],
        maharastra: ['Mumbai', 'Pune', 'Nagpur'],
        west_bangal: ['Kolkata', 'Howrah', 'Durgapur']
    };
    const state = req.params.state.toLowerCase();
    const cities = citiesData[state] || [];
   
    res.json(cities);
});



// for get update

router.get("/update",(req,res)=>{
      console.log("bjbdjabdjabdjabd")
    if(req.query.applicant_id){
      let basic_detail_data;
      let ssc_details_data;
      let hsc_details_data;
      let bachelor_details_data;
      let master_details_data;
      let work_experience_data;
      let language_known_data;
      let tech_known_data;
      let reference_data;
      let preference_data;
      console.log("For ID",req.query.applicant_id);
      let basic_detail_query=`SELECT * FROM BASIC_DETAILS WHERE APPLICANTID=${req.query.applicant_id}`;
      let ssc_detail_query=`SELECT * FROM  SSC_DETAILS WHERE APPLICANTID=${req.query.applicant_id}`;
      let hsc_detail_query=`SELECT * FROM  HSC_DETAILS WHERE APPLICANTID=${req.query.applicant_id}`;
      let bachelor_detail_query=`SELECT * FROM  DEGREE_DETAILS WHERE APPLICANTID=${req.query.applicant_id}`;
      let master_detail_query=`SELECT * FROM  MASTER_DETAIL WHERE APPLICANTID=${req.query.applicant_id}`;
      let workexpericequery=`SELECT * FROM  WORK_EXPERIENCE WHERE APPLICANTID=${req.query.applicant_id}`;
      let languageknownequery=`SELECT * FROM  LANGUAGE_KNOWN WHERE APPLICANTID=${req.query.applicant_id}`;
      let techknownequery=`SELECT * FROM  TECHNOLOGY_KNOWN WHERE APPLICANTID=${req.query.applicant_id}`;
      let referencequery=`SELECT * FROM  REFERENCE_DETAIL WHERE APPLICANTID=${req.query.applicant_id}`
      let preferencequery=`SELECT * FROM   PREFERENCE_DETAIL WHERE APPLICANTID=${req.query.applicant_id}`
        function getData(){
          return new Promise((res,rej)=>{
              dbConn.query(`${basic_detail_query};${ssc_detail_query};${hsc_detail_query};${bachelor_detail_query};${master_detail_query};${workexpericequery};${languageknownequery};${techknownequery};${techknownequery};${referencequery};${preferencequery}`,(err,result)=>{
                 
                  if(err){
                      throw(err);
                  }
                  basic_detail_data=result[0];
                  ssc_details_data=Object.assign({},result[1][0]);
                  hsc_details_data=Object.assign({},result[2][0]);
                  bachelor_details_data=Object.assign({},result[3][0]);
                  master_details_data=Object.assign({},result[4][0]);
                  work_experience_data=result[5];
                  language_known_data=result[6];
                 tech_known_data=result[7];
                 reference_data=result[9];
                 preference_data=result[10];
               console.log("---------------------->");
               console.log(preference_data[0].PREFERED_LOCATION);
                  
                  res(true);
                      
               });
              
          });
         
          
       }
       getData().then(()=>{
          // console.log(basic_detail_data[0]);
          // console.log(ssc_details_data);
          // console.log(hsc_details_data);
          // console.log(language_known_data)
        res.render("task13_update",{basic_detail_data,ssc_details_data,hsc_details_data,bachelor_details_data,master_details_data,work_experience_data,language_known_data,tech_known_data,reference_data,preference_data});
       });
          
  
      
  
       
     
    }
    
  });
router.get("/mainupdate",(req,res)=>{

    let basic_detail_data;
    let basic_detail_query=`SELECT * FROM BASIC_DETAILS `;
     dbConn.query(basic_detail_query,(err,result)=>{
        if(err){
            throw err;
        }
        basic_detail_data=result;
        
        res.render("task13_main",{basic_detail_data})
        
});
  
})

//   for updates

router.post("/update",(req,res,next)=>{
   

    // FOR BASIC DETAILS
    console.log("called");
    console.log(req.body);
    let id=req.query.applicant_id;
   
    const { firstname, lastname, designation, current_address, permenant_address, email, city, zip, statedropdown, gender, number, relationdropdown, date } = req.body[0];
  
  
   
   
//    fOR SSC DETAISL
let {ssc_board_name,
    ssc_passing_year,
    ssc_percentage}=req.body[1];


//     // for hsc details
    let {hsc_board_name,
        hsc_passing_year,
        hsc_percentage}=req.body[1];

        // for bachelor details
        let{
            bachelor_course_name,
            bachelor_univercity,
            bachelor_passing_year,
            bachelor_percentage,
            
        }=req.body[1];

//         // For Master details
        let {
            master_course_name,
            master_univercity ,
            master_passing_year,
            master_percentage,
        }=req.body[1];
        console.log(req.body[2]);

        let studentbasicdataupdatequery=`UPDATE BASIC_DETAILS SET  FIRST_NAME = '${firstname}', LAST_NAME= '${lastname}' ,DESIGNATION='${designation}',CURRENT_ADDRESS='${current_address}',PERMENANT_ADDRESS='${permenant_address}',PHONE_NUMBER='${number}',CITY='${city}',ZIP_CODE='${zip}',STATE='${statedropdown}',GENDER='${gender}',DOB='${date}',RELATIONSHIP_STATUS='${relationdropdown}' WHERE APPLICANTID=${id}`;

        let ssc_detail_update_query=`UPDATE SSC_DETAILS SET NAME_OF_BOARD='${ssc_board_name}'  ,PASSING_YEAR='${ssc_passing_year}' ,PERCENTAGE='${ssc_percentage}' WHERE APPLICANTID=${id}`
    let hsc_detail_update_query=`UPDATE HSC_DETAILS  SET NAME_OF_BOARD='${hsc_board_name}'  ,PASSING_YEAR='${hsc_passing_year}' ,PERCENTAGE='${hsc_percentage}' WHERE APPLICANTID=${id}`;

    let bachelor_detail_update_query=`UPDATE DEGREE_DETAILS  SET COURSENAME='${bachelor_course_name}',UNIVERCITY='${bachelor_univercity}' ,PASSING_YEAR='${bachelor_passing_year}',PERCENTAGE='${bachelor_percentage}'  WHERE APPLICANTID=${id}`;
    let master_detail_update_query=`UPDATE MASTER_DETAIL  SET COURSENAME='${master_course_name}',UNIVERCITY='${master_univercity}' ,PASSING_YEAR='${master_passing_year}',PERCENTAGE='${master_percentage}'  WHERE APPLICANTID=${id}`;
    console.log(studentbasicdataupdatequery);
    dbConn.query(`${studentbasicdataupdatequery};${ssc_detail_update_query};${hsc_detail_update_query};${bachelor_detail_update_query};${master_detail_update_query}`,(err,result)=>{
        if(err){
           res.send(err);
        }
        // console.log("Basic data is updated");
      });




        // for workexperience
       
           let companyname=req.body[2]
           let designation1=req.body[3];
           let fromdate=req.body[4];
          let   todate=req.body[5];
                   
            
               let previouscompnaydata=[];

//     // For language known
//  let {language,hindiread,hindiwrite,hindispeak,englishread,englishwrite,englishspeak,gujaratiread,gujaratiwrite,gujaratispeak,}=req.body;
//   let previouslanguagedata=[];

//   let languaecnonfig=[];
 
  
// if(typeof language=='object'){

//     for(let i=0;i<language.length;i++){
//         if(language[i]=="hindi"){
//             languaecnonfig.push({language:'hindi',read:hindiread,write:hindiwrite,speak:hindispeak});
//         }
//         if(language[i]=="english"){
//             languaecnonfig.push({language:'english',read:englishread,write:englishwrite,speak:englishspeak});
//         }
//         if(language[i]=="gujarati"){
//             languaecnonfig.push({language:'gujarati',read:gujaratiread,write:gujaratiwrite,speak:gujaratispeak});
//         }
//     }
// }
// else if(typeof language=='string'){
//     if(language=="hindi"){
//         languaecnonfig.push({language:'hindi',read:hindiread,write:hindiwrite,speak:hindispeak});
//     }
//     if(language=="english"){
//         languaecnonfig.push({language:'english',read:englishread,write:englishwrite,speak:englishspeak});
//     }
//     if(language=="gujarati"){
//         languaecnonfig.push({language:'gujarati',read:gujaratiread,write:gujaratiwrite,speak:gujaratispeak});
// }
// else{
//   console.log("Language is undefined")
// }
// }

// for(let i=0;i<languaecnonfig.length;i++){
//     // console.log("---------------------------------------------------->")
//     console.log(languaecnonfig);
//     let languageknown_query=`UPDATE LANGUAGE_KNOWN SET \`READ\`=${languaecnonfig[i].read?1:0},\`WRITE\`=${languaecnonfig[i].write?1:0},SPEAK=${languaecnonfig[i].speak?1:0} WHERE APPLICANTID=${id} AND LANGUAGE='${languaecnonfig[i].language}'`;
//      dbConn.query(languageknown_query,(err,res)=>{
//         if(err){
//             throw err;
//         }
//         // console.log("language data inserted");
//      })
//  }

//   for technolgy Known data

// let{
// php,mysql,laravel,oracle,phpradio,laravelradio,mysqlradio,oracleradio
// }=req.body;
// let previoustechnologydata=[];
// let technologies=[];
//      if(php){
//    technologies.push({technology:'php',profficiency:phpradio});
//      }
//      if(mysql){
//         technologies.push({technology:'mysql',profficiency:mysqlradio});
//      }
//      if(laravel){
//         technologies.push({technology:'laravel',profficiency:laravelradio});
//      }
//      if(oracle){
//         technologies.push({technology:'oracle',profficiency:oracleradio});
//      }
 
//      for(let i=0;i<technologies.length;i++){
        

//         let technology_known_query=`UPDATE TECHNOLOGY_KNOWN SET TECHNOLOGY='${technologies[i].technology}',EFFICIENCY_LEVEL='${technologies[i].profficiency}' 








//          WHERE APPLICANTID=${id} AND TECHNOLOGY='${technologies[i].technology}'`;
    
//          dbConn.query(technology_known_query,(err,res)=>{
//             if(err){
//                 throw err;
//             }
          
//          })
//      }
    
    
 
  function workexperienceEntry(){
    return new Promise((res,rej)=>{
        dbConn.query(`SELECT * FROM WORK_EXPERIENCE WHERE APPLICANTID=${id}`,(err,result)=>{
            if(err){
                throw err;
            }
           
            for(let i=0;i<result.length;i++){
               previouscompnaydata.push(result[i].COMANY_NAME);
            //    console.log("previouscompanydata",previouscompnaydata[i]);
            }
            res(true);
            
        })
    })
  }
  workexperienceEntry().then(()=>{
    if(!(typeof companyname=="undefined")){
let work_experience_query;

        for(let i=0;i<companyname.length;i++){
            if(typeof companyname=="string"){
     
                work_experience_query=`UPDATE WORK_EXPERIENCE SET COMANY_NAME='${companyname}',DESIGNATION='${designation1}',FROM_DATE='${fromdate}',TO_DATE='${todate}' WHERE APPLICANTID=${id} AND  COMANY_NAME='${previouscompnaydata}'`;
            }
            else{
         
                work_experience_query=`UPDATE WORK_EXPERIENCE SET COMANY_NAME='${companyname[i]}',DESIGNATION='${designation1[i]}',FROM_DATE='${fromdate[i]}',TO_DATE='${todate[i]}' WHERE APPLICANTID=${id} AND  COMANY_NAME='${previouscompnaydata[i]}'`;
                console.log(work_experience_query)
            }
        if(companyname[i]){
        
            dbConn.query(work_experience_query,(err,res)=>{
                if(err){
                    throw err;
                }
            })
        }
            
        }
       }
  });
 


   
})
module.exports = router;