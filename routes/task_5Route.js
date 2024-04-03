const express = require('express');
const router = express.Router();
const dbCon = require('../config/db.js');
const verifyToken=require("../utils/verifyToken");
const {paginationController} = require('../controller/paginationController.js');


router.get('/users',verifyToken,paginationController);


module.exports = router;