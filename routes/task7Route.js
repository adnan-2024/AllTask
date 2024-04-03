const express = require('express');
const router = express.Router();

const verifyToken=require("../utils/verifyToken");
const { getstudentAttendence, getStudentResults, getSingleResult } = require('../controller/attendenceManagementController.js');

router.get('/getStudentAttendence',verifyToken,getstudentAttendence);
router.get('/getStudentResult',verifyToken,getStudentResults);
router.get('/getsinglestudentresult',verifyToken,getSingleResult)













module.exports = router;