const express = require('express');
const dbCon = require('../config/db.js');
const router = express.Router();
const crypto = require('crypto');
const errorHandler = require('../utils/error.js');
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const verifyToken=require("../utils/verifyToken.js");
const { loadRegistrationPage, saveUserDetails, activateUser, loadLoginPage, loggedInUser } = require('../controller/authenticationController.js');
const {paginationController} = require('../controller/paginationController.js');
const { filterationController, getListing } = require('../controller/filterationController.js');
const { getstudentAttendence, getStudentResults, getSingleResult } = require('../controller/attendenceManagementController.js');
const { dynamicgridControllerPage } = require('../controller/dynamicgridController.js');
const { loadSearchIntialData, getSearchData } = require('../controller/searchTaskController.js');
const { loadIntialDelimiter, searchForData } = require('../controller/delimiterController.js');
const { saveEducationDetails, saveBasicDetails, saveWorkExperience, saveLanguageDetails, savePreferncesDetails, saveReferencesDetails, saveTechnologyDeatils, getCitiesData, getUserData, listUpdateData, updateStudentData } = require('../controller/crudWithAjax.js');
const { saveUser, getSavedData } = require('../controller/crudWithOutAjax.js');

// Routes For Authentication
router.get('/register',loadRegistrationPage);
router.post('/register',saveUserDetails);
router.get('/activate/:activationCode',activateUser);
router.get("/login",loadLoginPage)
router.post('/login',loggedInUser);

// Routes for Js basic projects
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
});

// Routes For Wireframes
router.get("/webpages/ehya",verifyToken,(req,res)=>{
  res.render("ehya");
})
router.get("/webpages/awn",verifyToken,(req,res)=>{
  res.render("awn");
})
router.get("/webpages/hirex",verifyToken,(req,res)=>{
  res.render("Hirex");
})

// Pagination Task
router.get('/pagination/users',verifyToken,paginationController);

// Filteration Task
router.get('/filteration/filter',verifyToken,filterationController);
router.get("/filteration/users",verifyToken,getListing);

// Attendence And Exam Task
router.get('/task7/getStudentAttendence',verifyToken,getstudentAttendence);
router.get('/task7/getStudentResult',verifyToken,getStudentResults);
router.get('/task7/getsinglestudentresult',verifyToken,getSingleResult)

// Dyanmic Grid Task
router.get('/dynamicgrid/',verifyToken,dynamicgridControllerPage);


// Seacrhing Task



router.get('/search/getStudentAttendence',verifyToken,loadSearchIntialData);
// route for search
router.post('/search/getStudentAttendence',verifyToken,getSearchData);


// search With delimter Task




router.get('/delimeter/getStudentAttendence',verifyToken,loadIntialDelimiter);
// route for search
router.post('/delimeter/getStudentAttendence',verifyToken,searchForData);


// Fetch Api TAsks
router.get("/api/posts",verifyToken,(req,res)=>{
  
  res.render("task11_home");
})
router.get("/api/singlepost/:id",verifyToken,(req,res)=>{
  res.render("task11_singlepost")
})
// crud Without Ajax

router.get("/crud/",verifyToken, (req, res) => {
  res.render("task12_home");
});
router.post("/crud/create",verifyToken, saveUser);
router.get("/crud/update",verifyToken,getSavedData);




// Crud With Ajax
router.get("/crud_ajax/",verifyToken,(req,res)=>{
  
  res.render("task13_home");
});
router.post('/crud_ajax/education-details',verifyToken,saveEducationDetails);

router.post('/crud_ajax/basic-details',verifyToken,saveBasicDetails);

router.post('/crud_ajax/work-experience',verifyToken,saveWorkExperience)
router.post('/crud_ajax/add-language',verifyToken,saveLanguageDetails);
router.post('/crud_ajax/add-preference',verifyToken,savePreferncesDetails)
router.post('/crud_ajax/add-reference',verifyToken,saveReferencesDetails);
router.post('/crud_ajax/add-technology',verifyToken,saveTechnologyDeatils)


router.get('/crud_ajax/cities/:state',getCitiesData);



// for get update

router.get("/crud_ajax/update",verifyToken,getUserData);
router.get("/crud_ajax/mainupdate",verifyToken,listUpdateData)

//   for updates

router.post("/crud_ajax/update",verifyToken,updateStudentData)




router.get("/",verifyToken,(req,res)=>{
  res.render("home")
});



module.exports = router;