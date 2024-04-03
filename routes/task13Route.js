const express = require('express');
const dbConn = require('../config/db.js');
const verifyToken = require('../utils/verifyToken.js');
const { saveEducationDetails, saveBasicDetails, saveWorkExperience, saveLanguageDetails, savePreferncesDetails, saveReferencesDetails, saveTechnologyDeatils, getCitiesData, getUserData, listUpdateData, updateStudentData } = require('../controller/crudWithAjax.js');
const router = express.Router();

router.get("/",verifyToken,(req,res)=>{
  
    res.render("task13_home");
});
router.post('/education-details',verifyToken,saveEducationDetails);

router.post('/basic-details',verifyToken,saveBasicDetails);
 
router.post('/work-experience',verifyToken,saveWorkExperience)
router.post('/add-language',verifyToken,saveLanguageDetails);
router.post('/add-preference',verifyToken,savePreferncesDetails)
router.post('/add-reference',verifyToken,saveReferencesDetails);
router.post('/add-technology',verifyToken,saveTechnologyDeatils)


router.get('/cities/:state',getCitiesData);



// for get update

router.get("/update",verifyToken,getUserData);
router.get("/mainupdate",verifyToken,listUpdateData)

//   for updates

router.post("/update",verifyToken,updateStudentData)
module.exports = router;