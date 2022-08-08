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
const {getDoctorHome,getDoctorPatientHistory,getDoctorEditPrescription,getUpcomingAppointments,getDoctorTestResults} = require('../controller/doctorController');
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
// router.get("/home",decorateHTMLResponse('Home Doctor'),getDoctorHome);
router.get('/home',decorateHTMLResponse('Doctor Home'),getDoctorHome);
router.get('/patientHistory',decorateHTMLResponse('Patient History'),getDoctorPatientHistory);
router.get('/editPrescription',decorateHTMLResponse('edit prescription'),getDoctorEditPrescription);
router.get('/upcomingAppointments',decorateHTMLResponse('Upcoming Appointments'),getUpcomingAppointments);
router.get('/testResults',decorateHTMLResponse('Test Results'),getDoctorTestResults);




/*
Export
*/
module.exports = router;