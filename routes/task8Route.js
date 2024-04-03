const express = require('express');
const router = express.Router();

const verifyToken=require("../utils/verifyToken");
const { dynamicgridControllerPage } = require('../controller/dynamicgridController.js');

router.get('/',verifyToken,dynamicgridControllerPage);

module.exports = router;