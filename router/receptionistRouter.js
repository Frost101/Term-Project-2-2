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
const {getReceptionistBloodGiveaway,getReceptionistAddBlood,getReceptionistBloodBank,getConfirmAppointment ,getCancelAppointment, getAppointments, getReceptionistApproveAppointments, getReceptionistHome} = require('../controller/receptionistController');
const decorateHTMLResponse = require("../middlewares/common-middlewares/decorateHTMLResponse");


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
router.get("/home",decorateHTMLResponse('Home Receptionist'),getReceptionistHome);
router.get("/approveAppointments",decorateHTMLResponse('Approve Appointments'),getReceptionistApproveAppointments);
router.get("/bloodBank",decorateHTMLResponse("Blood Bank"),getReceptionistBloodBank);
router.get("/addBlood",decorateHTMLResponse("Add Blood"),getReceptionistAddBlood);
router.get("/giveaway",decorateHTMLResponse("Blood Giveaway"),getReceptionistBloodGiveaway);

router.post('/getAppointments',getAppointments);
router.post('/confirmAppointment',getConfirmAppointment);
router.post('/cancelAppointment',getCancelAppointment);



/*
Export
*/
module.exports = router;
