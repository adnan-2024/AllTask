const express = require('express');
const router = express.Router();
const dbCon = require('../config/db.js');
const verifyToken=require("../utils/verifyToken");
const { filterationController, getListing } = require('../controller/filterationController.js');


let resultperpage=200
router.get('/filter',verifyToken,filterationController)
router.get("/users",verifyToken,getListing)

module.exports = router;