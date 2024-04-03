const saveUser=(req,res,next)=>{
    try {

        const { firstname, lastname, designation, current_address, permenant_address, email, city, zip, statedropdown, gender, number, relationdropdown, date } = req.body;
          if(!firstname || !lastname || !designation ||!current_address ||!permenant_address||!email||!city||!zip||!statedropdown ||!gender ||!number||!relationdropdown||!date){
            return next(errorHandler(404,"Please Fill All the detaisl of forms"));
          }
        // for date 
        if (date) {
            let datea = date;
            var regEx = /^\d{4}-\d{2}-\d{2}$/;
            if (!datea.match(regEx)) {
                return next(errorHandler(404, "please enter a date in yyyy/mm/dd format"))
            }
        }
        // for mobilenumer
        if (number.length != 10) {
            return next(errorHandler(404, "please enter mobile value with 10 digit"))
        }
       
        // Query for basic detail insertion
        const query = "INSERT INTO BASIC_DETAILS(`FIRST_NAME`,`LAST_NAME`,`DESIGNATION`,`CURRENT_ADDRESS`,`PERMENANT_ADDRESS`,`EMAIL`,`PHONE_NUMBER`,`CITY`,`ZIP_CODE`,`STATE`,`GENDER`,`DOB`,`RELATIONSHIP_STATUS`) VALUES (?)";
      
        const values = [firstname, lastname, designation, current_address, permenant_address, email, number, city, zip, statedropdown, gender, date,relationdropdown];
        dbCon.query(query, [values], (err, result) => {
            if (err) {
               return res.send(err);
            }
            otherinsertion(result.insertId);
        })

        console.log("user route caleed");


        
        function otherinsertion(id) {

            // query for inserting Education_details
            // validation for education _details
          console.log("-------------------------------------------------->");
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
           
        if(!ssc_board_name ||! ssc_passing_year ||! ssc_percentage ||! hsc_board_name ||! hsc_passing_year ||! hsc_percentage ||! bachelor_course_name ||! bachelor_univercity ||! bachelor_passing_year ||! bachelor_percentage ||! master_course_name ||! master_univercity ||! master_passing_year ||! master_percentage){
            return next(errorHandler("404","Please Fill All Education Details Properly"));
        }
        if (ssc_percentage) {
            var x = parseFloat(ssc_percentage);
           
            if (isNaN(x) || x < 0 || x > 100) {
                return next(errorHandler("404","Please Fill ssc Percentage proper"))
            }
        }
        if (hsc_percentage) {
            var x = parseFloat(hsc_percentage);
          
            if (isNaN(x) || x < 0 || x > 100) {
                return next(errorHandler("404","Please Fill hsc Percentage proper"));
            }
        }
        if (bachelor_percentage) {
            var x = parseFloat(bachelor_percentage);
           
            if (isNaN(x) || x < 0 || x > 100) {
                return next(errorHandler("404","Please Fill Bachelor Percentage proper"));
            }
        }
        if(ssc_passing_year){

           let ssc_year_length=ssc_passing_year.length;
           if(ssc_year_length!=4){
            return next(errorHandler("404","Please Enter year properly in ssc"));
           }

        }
        if(hsc_passing_year){

           let hsc_year_length=hsc_passing_year.length;
           if(hsc_year_length!=4){
            return next(errorHandler("404","Please Enter year properly in ssc"));
           }

        }
        if(bachelor_passing_year){

           let bachelor_year_length=bachelor_passing_year.length;
           if(bachelor_year_length!=4){
            return next(errorHandler("404","Please Enter year properly in bachelor"));
           }

        }
        if(master_passing_year){

           let master_year_length=master_passing_year.length;
           if(master_year_length!=4){
            return next(errorHandler("404","Please Enter year properly in Master"));
           }

        }
        if (master_percentage) {
            var x = parseFloat(master_percentage);

            if (isNaN(x) || x < 0 || x > 100) {
                isvalid = false;
                return next(errorHandler("404","Please Enter percentage value properly in Master"));
            }
        }

           
            let ssceduquery = "INSERT INTO SSC_DETAILS(`APPLICANTID`,`NAME_OF_BOARD`,`PASSING_YEAR`,`PERCENTAGE`) VALUES (?)";
            const sscvalues = [id, ssc_board_name,
                ssc_passing_year,
                ssc_percentage,];
            dbCon.query(ssceduquery, [sscvalues], (err, result) => {
                if (err) {
                    return res.send(err);
                }
                console.log("ssc values inserted");
            })
       
            let hsceduquery = "INSERT INTO HSC_DETAILS(`APPLICANTID`,`NAME_OF_BOARD`,`PASSING_YEAR`,`PERCENTAGE`) VALUES (?)";
            const hscvalues = [id, hsc_board_name,
                hsc_passing_year,
                hsc_percentage,];
            dbCon.query(hsceduquery, [hscvalues], (err, result) => {
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
            dbCon.query(bacheloreduquery, [bachelorvalues], (err, result) => {
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
            dbCon.query(mastereduquery, [mastervalues], (err, result) => {
                if (err) {
                    return res.send(err);
                }
                console.log("master values inserted");
            });
          

            //  validation and insertion for workexperience tbale
            const {
                companyname,
                designation1,
                fromdate,
                todate
                       
                   } = req.body;
                  
              console.log(companyname);
              console.log(designation1);
              console.log(fromdate);
              console.log(todate);
            console.log("3-----3---------3")
              for(let i=0;i<companyname.length;i++){
               let workexpericequery = "INSERT INTO WORK_EXPERIENCE(`APPLICANTID`,`COMANY_NAME`,`DESIGNATION`,`FROM_DATE`,`TO_DATE`) VALUES (?)";
               let work_experience_value_1=[id,companyname[i],designation1[i],fromdate[i],todate[i]];
               if(companyname[i] && designation1[i] && fromdate[i] && todate[i]){
               dbCon.query(workexpericequery, [work_experience_value_1], (err, result) => {
                               if (err) {
                                   next(err);
                               }
                               console.log("values secod row inserted");
                           })
                        }
              }
             
            
            // validation for Language Known
           const {language,hindiread,hindiwrite,hindispeak,englishread,englishwrite,englishspeak,gujaratiread,gujaratiwrite,gujaratispeak}=req.body;
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
                     
                             dbCon.query(langquery, [queryvalues], (err, result) => {
                                 if (err) {
                                     next(err);
                                 }
                                 console.log("language checkboxData is inserted");
                             })
            }

             // ------ - Validation for Technologyknown  ----------------------------------------------------------------------------------------

             const{php,mysql,laravel,oracle,phpradio,laravelradio,mysqlradio,oracleradio}=req.body;
             let technologies=[];
     if(php){
   technologies.push({technology:'php',profficiency:phpradio});
     }
     if(mysql){
        technologies.push({technology:'mysql',profficiency:mysqlradio});
     }
     if(laravel){
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
                     
                                dbCon.query(techlangquery, [samplearr[i]], (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    console.log("laravel checkboxData is inserted");
                                });
             }

            // -----------------------------------------
            // Validation for refrences
            const {referencename,referencecontactnumber,referecerelation}=req.body;
console.log(typeof referencename);
console.log(referencename.length);
                       
if(typeof referencename=="string"){
    let referencequery="INSERT INTO REFERENCE_DETAIL(`APPLICANTID`,`NAME`,`CONTACT_NUMBER`,`RELATION`) VALUES (?)"
   let referencequeryvalue =[id,referencename,referencecontactnumber,referecerelation]
   if(referencename && referencecontactnumber && referecerelation){

                  dbCon.query(referencequery,[referencequeryvalue],(err,result)=>{
                           if(err){
                               next(err);
                           }
                           console.log("reference 1 value is inserted into db");
                       });
                      
                   }
}
else{
 for(let i=0;i<referencename.length;i++){
   let referencequery="INSERT INTO REFERENCE_DETAIL(`APPLICANTID`,`NAME`,`CONTACT_NUMBER`,`RELATION`) VALUES (?)"
   let referencequeryvalue =[id,referencename[i],referencecontactnumber[i],referecerelation[i]]
   if(referencename[i] && referencecontactnumber[i] && referecerelation[i]){

                  dbCon.query(referencequery,[referencequeryvalue],(err,result)=>{
                           if(err){
                               next(err);
                           }
                           console.log("reference 1 value is inserted into db");
                       });
                      
                   }
                 
                   
 }
}
                
 // --------------------------------------------------------------------
//  For preference tabel  

const {preferedlocationdropdown,noticeperiod,departmentdropdown,currentctc,expectedctc}=req.body;
console.log(preferedlocationdropdown)
console.log(noticeperiod)
console.log(departmentdropdown)
console.log(currentctc);
console.log(expectedctc);
let preferencequery="INSERT INTO  PREFERENCE_DETAIL(`APPLICANTID`,`PREFERED_LOCATION`,`NOTICE_PERIOD`,`EXPECTED_CTC`,`CURRENT_CTC`,`DEPARTMENT`) VALUES (?)";
let preferencevalues=[id,preferedlocationdropdown,noticeperiod,expectedctc,currentctc,departmentdropdown];
dbCon.query(preferencequery,[preferencevalues],(err,result)=>{
    if(err){
        throw err;
    }
    console.log("preference data is inserted")
;})
      
 
    }



    }

    catch (error) {
        next(error);
    }
                    
}
const getSavedData=(req,res)=>{
     try {
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
            console.log("For ID",req.query.applicant_id);
            let basic_detail_query=`SELECT * FROM BASIC_DETAILS WHERE APPLICANTID=${req.query.applicant_id}`;
            let ssc_detail_query=`SELECT * FROM  SSC_DETAILS WHERE APPLICANTID=${req.query.applicant_id}`;
            let hsc_detail_query=`SELECT * FROM  HSC_DETAILS WHERE APPLICANTID=${req.query.applicant_id}`;
            let bachelor_detail_query=`SELECT * FROM  DEGREE_DETAILS WHERE APPLICANTID=${req.query.applicant_id}`;
            let master_detail_query=`SELECT * FROM  MASTER_DETAIL WHERE APPLICANTID=${req.query.applicant_id}`;
            let workexpericequery=`SELECT * FROM  WORK_EXPERIENCE WHERE APPLICANTID=${req.query.applicant_id}`;
            let languageknownequery=`SELECT * FROM  LANGUAGE_KNOWN WHERE APPLICANTID=${req.query.applicant_id}`;
            let techknownequery=`SELECT * FROM  TECHNOLOGY_KNOWN WHERE APPLICANTID=${req.query.applicant_id}`;
            let referencequery=`SELECT * FROM  REFERENCE_DETAIL WHERE APPLICANTID=${req.query.applicant_id}`;
              function getData(){
                return new Promise((res,rej)=>{
                    dbCon.query(`${basic_detail_query};${ssc_detail_query};${hsc_detail_query};${bachelor_detail_query};${master_detail_query};${workexpericequery};${languageknownequery};${techknownequery};${techknownequery};${referencequery}`,(err,result)=>{
                       
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
                
                        
                        res(true);
                            
                     });
                    
                });
               
                
             }
             getData().then(()=>{
                // console.log(basic_detail_data[0]);
                // console.log(ssc_details_data);
                // console.log(hsc_details_data);
                // console.log(language_known_data)
              res.render("update",{basic_detail_data,ssc_details_data,hsc_details_data,bachelor_details_data,master_details_data,work_experience_data,language_known_data,tech_known_data,reference_data});
             });
                
        
            
        
             
           
          }



     } catch (error) {
        
     }
    }
module.exports={saveUser,getSavedData}