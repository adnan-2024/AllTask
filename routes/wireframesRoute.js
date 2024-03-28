const express = require('express');
const router = express.Router();


router.get("/ehya",(req,res)=>{
    res.render("ehya");
})






module.exports = router;