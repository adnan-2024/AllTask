const express = require('express');
const router = express.Router();
const dbCon = require('../config/db.js');
const verifyToken = require('../utils/verifyToken.js');
const { loadSearchIntialData, getSearchData } = require('../controller/searchTaskController.js');
let resultperpage=120;

router.get('/getStudentAttendence',verifyToken,loadSearchIntialData);
// route for search
router.post('/getStudentAttendence',verifyToken,getSearchData);










module.exports = router;