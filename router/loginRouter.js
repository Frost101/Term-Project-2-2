/*
Imorting External dependencies
*/
const express = require('express');

/*
Importing Internal Dependencies
*/
const {getLoginAll,getLoginDoctor,getLoginNurse,getLoginPatient,getLoginAdmin} = require('../controller/logincontroller');
const decorateHTMLResponse = require("../middlewares/common-middlewares/decorateHTMLResponse");


/*
Creating a router
*/
const router = express.Router();

/*
Routing Setup
*/
router.get("/",decorateHTMLResponse('Login'),getLoginAll);
router.get("/loginAdmin",decorateHTMLResponse('Login Admin'),getLoginAdmin);
router.get("/loginPatient",decorateHTMLResponse('Login Patient'),getLoginPatient);
router.get("/loginDoctor",decorateHTMLResponse('Login Doctor'),getLoginDoctor);
router.get("/loginNurse",decorateHTMLResponse('Login Nurse'),getLoginNurse);

/*
Export
*/
module.exports = router;
