const express = require('express');
const dbCon = require('../config/db.js');
const router = express.Router();
const { loadRegistrationPage, saveUser, activateUser, loadLoginPage, loggedInUser } = require('../controller/authenticationController.js');



router.get('/register',loadRegistrationPage);
  
// Registration submission route
router.post('/register',saveUser);
router.get('/activate/:activationCode',activateUser);
router.get("/login",loadLoginPage)
// Login submission route
router.post('/login',loggedInUser);
  
module.exports = router;