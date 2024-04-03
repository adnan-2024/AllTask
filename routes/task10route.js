const express = require('express');
const router = express.Router();

const verifyToken = require('../utils/verifyToken.js');
const { loadIntialDelimiter, searchForData } = require('../controller/delimiterController.js');

let resultperpage=100;
router.get('/getStudentAttendence',verifyToken,loadIntialDelimiter);
// route for search
router.post('/getStudentAttendence',verifyToken,searchForData);
module.exports=router;