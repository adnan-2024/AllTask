const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
const crypto = require('crypto');
const errorHandler = require('../utils/error.js');
const dbCon = require('../config/db.js');


const loadRegistrationPage=(req,res)=>{
    try{
        res.render('registration');
    }
    catch(error){
        console.log(error);
    }

}
const saveUser=async(req,res,next)=>{
    try{
        function generateSalt() {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let code = '';
            for (let i = 0; i < 4; i++) {
              code += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return code;
          }
          
        
          console.log("user route is called");
          const{firstName,lastName,email,password}=req.body;
        
          if(!firstName || !lastName || !email || !password){
            return next(errorHandler(400,"Please Fill All the details"))
          }
          let searchemail=`SELECT * FROM users WHERE email='${email}'`
         await new Promise((resolve,reject)=>{
          dbCon.query(searchemail,(err,result)=>{
            if(err){
             throw err;
            }
            
           if(result.length!=0){
             return next(errorHandler(400,"Email Already Exits"));
           }
           resolve();
        
         })
        });
            
         
             let salt=generateSalt();
             let finalpassword=password+salt;
             let hashedPassword = await bcrypt.hash(finalpassword, 8);
          //  console.log(hashedPassword);
            let activationCode = crypto.randomBytes(20).toString('hex');
            let expirationTime = new Date();
            expirationTime.setHours(expirationTime.getHours() + 1);
        
            //  console.log(expirationTime)
            dbCon.query('INSERT INTO users (first_name,last_name,email, password, activation_code, activation_expires,salt, activation_status) VALUES (?,?,?,?,?,?,?,0)', 
              [firstName,lastName,email,hashedPassword,activationCode,expirationTime,salt],
              (err, results) => {
                if (err) {
                  console.error('Error inserting user:', err);
                  return res.status(500).send('Error registering user');
                }
          
                let activationLink = `/activate/${activationCode}`;
                res.status(200).send({success:true,activationLink});
              }
            );
                
    }
    catch(error){
        console.log(error);
    }

}
const activateUser=(req,res)=>{
    try{
        const activationCode = req.params.activationCode;

        dbCon.query('SELECT * FROM users WHERE activation_code = ?', 
          [activationCode],
          (err, results) => {
            if (err) {
              console.error('Error activating user:', err);
              return res.status(500).send('Error activating user');
            }
    
            if (results.length === 0) {
              return res.status(400).send('Invalid activation code');
            }
    
            const user = results[0];
    
            if (user.activation_status === 1) {
              return res.status(400).send('Account already activated');
            }
    
            // Check if activation code has expired
            if (new Date() > user.activation_expires) {
              // Handle expired activation code
              dbCon.query('UPDATE users SET activation_status = 0 WHERE activation_code = ?', 
                [activationCode],
                (err, results) => {
                  if (err) {
                    console.error('Error updating activation status:', err);
                    return res.status(500).send('Error activating user');
                  }
                  return res.status(400).send('Activation link expired. Please register again.');
                }
              );
            } else {
              // Update activation status
              dbCon.query('UPDATE users SET activation_status = 1 WHERE activation_code = ?', 
                [activationCode],
                (err, results) => {
                  if (err) {
                    console.error('Error updating activation status:', err);
                    return res.status(500).send('Error activating user');
                  }
                
                  return res.status(200).send({success:true})
                }
              );
            }
          }
        ); 
    }
    catch(error){
        console.log(error);
    }
}
const loadLoginPage=(req,res)=>{
    try {
        res.render("login");
    } catch (error) {
        
    }
}
const loggedInUser=async(req,res,next)=>{
    try{
        let { email, password } = req.body;
         let user;
    
        await new Promise((resolve,reject)=>{
          dbCon.query("SELECT * FROM users WHERE email = ? ", 
          [email],
          (err, results) => {
            if (err) {
              console.error('Error logging in:', err);
              return res.status(500).send('Error logging in');
            }
      
            if (results.length === 0) {
             
            return next(errorHandler(401,"Please Register Your Account"))
            }
      
            user = results[0];
            if (user.activation_status === 0) {
              return next(errorHandler(401,"Account not  yet Activated"));
            }
                resolve();
           
          }
        );
        });
        let salt=user.salt;
        let finalpassword=password+salt;
        
        let isValidPassword=await bcrypt.compare(finalpassword,user.password);
       if(!isValidPassword){
       return next(errorHandler(400, "Invalid Password"));
       }

      let secretKey = process.env.JWT_SECRET_KEY;
     
      const token = jwt.sign({
        userId: user.id,
        username: user.first_name,
    
      }, secretKey, {expiresIn: '1h'});
        
       return  res
       .cookie('access_token', token, { httpOnly: true })
       .status(200).json({success:true});
      }
    
    
      
      catch(error){
        console.log(error);
      }
}
module.exports={loadRegistrationPage,saveUser,activateUser,loadLoginPage,loggedInUser}