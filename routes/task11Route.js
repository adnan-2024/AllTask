const express = require('express');
const verifyToken = require('../utils/verifyToken');
const router = express.Router();


router.get("/posts",verifyToken,(req,res)=>{
  
    res.render("task11_home");
})
router.get("/singlepost/:id",verifyToken,(req,res)=>{
    res.render("task11_singlepost")
})


module.exports = router;