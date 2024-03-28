const express = require('express');
const router = express.Router();


router.get("/posts",(req,res)=>{
  
    res.render("task11_home");
})
router.get("/singlepost/:id",(req,res)=>{
    res.render("task11_singlepost")
})


module.exports = router;