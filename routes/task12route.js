const express = require('express');
const dbCon = require('../config/db.js');
const verifyToken = require('../utils/verifyToken.js');
const { saveUser, getSavedData } = require('../controller/crudWithOutAjax.js');
const router = express.Router();


router.get("/",verifyToken, (req, res) => {
    res.render("task12_home");
});
router.post("/create",verifyToken, saveUser);


router.get("/update",verifyToken,getSavedData);

module.exports = router;