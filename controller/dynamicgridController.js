let resultperpage=10;
const dbCon = require('../config/db.js');
const dynamicgridControllerPage=(req,res)=>{
    try{

        if(req.query.currentpage){
            let query=req.cookies.query
            dbCon.query(query,(err,resultdata)=>{
                const numberofRecords=resultdata.length;
                let currentpage=req.query.currentpage?Number(req.query.currentpage):1;
                let offset=(currentpage-1)*resultperpage;
                let numberofPages=Math.ceil(numberofRecords / resultperpage);
                query=query.replace(";","")
                let queryforpagination= `${query} LIMIT ${offset},${resultperpage}`;
                const singleobj=resultdata[0];
                name_of_col=Object.keys(singleobj);
                num_of_col= Object.keys(singleobj).length;
              
                
                dbCon.query(queryforpagination,(err,result)=>{
                    if(err){
                        throw err;
                    }
                
                 res.render("task7_home",{num_of_col,result,name_of_col,currentpage,numberofPages,query,error:null});
    
             })
               
              
                
            
               
               })
        }
    
    
       else if(req.query.queryvalue){
        try{
           console.log("Query value is presnet");
           let query=req.query.queryvalue;
            var num_of_col, name_of_col;
         if(typeof localStorage === "undefined" || localStorage === null){
            res.cookie("query",query, { maxAge: 900000, httpOnly: true });
            }
            else{
                res.clearCookie("query");
                res.cookie("query",query, { maxAge: 900000, httpOnly: true });
            }
         
            
             dbCon.query(query,(err,resultdata)=>{
                console.log
                if(typeof resultdata=="undefined"){
                    res.render("task7_home",{error:"Wrong Query",result:null})
                }
                else{
    
                    const numberofRecords=resultdata.length;
                    let currentpage=req.query.currentpage?Number(req.query.currentpage):1;
                    let offset=(currentpage-1)*resultperpage;
                    let numberofPages=Math.ceil(numberofRecords / resultperpage);
                    query=query.replace(";","")
                    let queryforpagination= `${query} LIMIT ${offset},${resultperpage}`;
                    const singleobj=resultdata[0];
                    name_of_col=Object.keys(singleobj);
                    num_of_col= Object.keys(singleobj).length;
                    
                    
                    dbCon.query(queryforpagination,(err,result)=>{
                        if(err){
                            throw err;
                        }
                        console.log(result);
                        res.render("task7_home",{num_of_col,result,name_of_col,currentpage,numberofPages,query,error:null});
                        
                    })
                    
                }
              
                
            
               
               })
            }
            catch(error){
                res.render("task7_home",{error:"Wrong query",num_of_col:null});
    
            }
        }
        else{
           res.render("task7_home",{error:"Please Enter an query",result:null});
        }
        
    }
    catch(error){
        res.render("task7_home",{error:"Wrong query",num_of_col:null});
    }
}

module.exports={ dynamicgridControllerPage}