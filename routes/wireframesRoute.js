const express = require('express');
const router = express.Router();


router.get("/ehya",(req,res)=>{
    res.render("ehya");
})
router.get("/awn",(req,res)=>{
    res.render("awn");
})






module.exports = router;