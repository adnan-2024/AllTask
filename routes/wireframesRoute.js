const express = require('express');
const verifyToken = require('../utils/verifyToken');
const router = express.Router();


router.get("/ehya",verifyToken,(req,res)=>{
    res.render("ehya");
})
router.get("/awn",verifyToken,(req,res)=>{
    res.render("awn");
})
router.get("/hirex",verifyToken,(req,res)=>{
    res.render("Hirex");
})






module.exports = router;