const express = require('express');
const router = express.Router();




router.get("/dynamic-table",(req,res)=>{
  res.render("dynamic_table")
})
router.get("/kuku-cube",(req,res)=>{
  res.render("kukucube")
})
router.get("/tic-tac-toe",(req,res)=>{
  res.render("tic-tac-toe")
})
router.get("/bubble-sort",(req,res)=>{
  res.render("Sorting")
})
router.get("/events",(req,res)=>{
  
  res.render("events")
})


module.exports = router;