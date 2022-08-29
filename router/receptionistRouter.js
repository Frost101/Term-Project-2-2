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
const {getBloodGroups,addDonor,bloodGiveaway,getBloodBags,getBloodBankCount,getReceptionistBloodGiveaway,getReceptionistAddBlood,getReceptionistBloodBank,getConfirmAppointment ,getCancelAppointment, getAppointments, getReceptionistApproveAppointments, getReceptionistHome} = require('../controller/receptionistController');
const decorateHTMLResponse = require("../middlewares/common-middlewares/decorateHTMLResponse");
const { route } = require('./loginRouter');


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

/*
    GET JSON response
*/
router.get("/getBloodBagCount",getBloodBankCount);
router.get("/getBloodGroups",getBloodGroups);


router.post('/getAppointments',getAppointments);
router.post('/confirmAppointment',getConfirmAppointment);
router.post('/cancelAppointment',getCancelAppointment);
router.post("/getBloodBags",getBloodBags);
router.post("/bloodGiveaway",bloodGiveaway);
router.post("/addDonor",addDonor);



/*
Export
*/
module.exports = router;
