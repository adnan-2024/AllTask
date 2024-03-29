const express = require('express');
const router = express.Router();
const verifyToken=require("../utils/verifyToken")



router.get("/dynamic-table",verifyToken,(req,res)=>{
  res.render("dynamic_table")
})
router.get("/kuku-cube",verifyToken,(req,res)=>{
  res.render("kukucube")
})
router.get("/tic-tac-toe",verifyToken,(req,res)=>{
  res.render("tic-tac-toe")
})
router.get("/bubble-sort",verifyToken,(req,res)=>{
  res.render("Sorting")
})
router.get("/events",verifyToken,(req,res)=>{
  
  res.render("events")
})


module.exports = router;