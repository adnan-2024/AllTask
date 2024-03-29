const jwt=require("jsonwebtoken");

const verifyToken=(req,res,next)=>{

    try{

        let secretkey=process.env.JWT_SECRET_KEY;
        
        const token = req.cookies.access_token;
        let user=jwt.verify(token,secretkey);
        next();
    }
    catch(error){
        return res.render("tokenerror")
        
    }
    

}
module.exports=verifyToken;