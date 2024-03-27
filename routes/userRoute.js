const express = require('express');
const dbCon = require('../config/db.js');
const router = express.Router();
const crypto = require('crypto');
const errorHandler = require('../utils/error.js');
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const verifyToken=require("../utils/verifyToken.js");


router.get("/",verifyToken,(req,res)=>{
  res.render("home")
})


module.exports = router;