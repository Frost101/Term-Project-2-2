/*
Imorting External dependencies
*/
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');


/*
Importing Internal Dependencies
*/
const decorateHTMLResponse = require("../middlewares/common-middlewares/decorateHTMLResponse");
const {getAdminHome,getAdminApproveDoctor,getAdminApproveReceptionist,getAdminApproveLabAssistant} = require("../controller/adminController");

/*
Creating a router
*/
const router = express.Router();
router.use(cors());
router.options('*',cors());
router.use(cookieParser(process.env.COOKIE_SECRET));
router.use(express.static(path.join(__dirname,"../public")));     //Setting up static Folders
router.use(express.static(path.join(__dirname,"../public/js"))); 
router.use(express.static(path.join(__dirname,"../public/images"))); 
router.use(express.static(path.join(__dirname,"../public/css")));


/*
Routing Setup
*/
router.get('/home',decorateHTMLResponse("Admin Home"),getAdminHome);
router.get('/approveDoctor',decorateHTMLResponse("Approve Doctor"),getAdminApproveDoctor);
router.get('/approveReceptionist',decorateHTMLResponse("Approve Receptionist"),getAdminApproveReceptionist);
router.get('/approveLabAssistant',decorateHTMLResponse("Approve Lab Assistant"),getAdminApproveLabAssistant);


/*
Export
*/
module.exports = router;