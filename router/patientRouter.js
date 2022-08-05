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
const {getBookAppointment,getDoctorConfirm, getPatientHome,getPatientAppointments,getPatientAppointmentsHistory,getPatientHireAmbulance,getPatientHireNurse,getPatientTest,getPatientUpcomingAppointments,getDoctor,getPatientAppointmentConfirm} = require('../controller/patientController');
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
router.get("/home",decorateHTMLResponse('Home Patient'),getPatientHome);
router.get("/appointments",decorateHTMLResponse('Book Appointments'),getPatientAppointments);
router.get("/appointmentsHistory",decorateHTMLResponse("Appointments History"),getPatientAppointmentsHistory);
router.get("/ambulance",decorateHTMLResponse("Hire Ambulance"),getPatientHireAmbulance);
router.get("/nurse",decorateHTMLResponse("Hire Nurse"),getPatientHireNurse);
router.get("/test",decorateHTMLResponse("Test Results"),getPatientTest);
router.get("/upcomingAppointments",decorateHTMLResponse("Upcoming Appointments"),getPatientUpcomingAppointments);
router.get("/confirmAppointment",decorateHTMLResponse('Confirm Appointment'), getPatientAppointmentConfirm);
router.post("/getDoctor",getDoctor);
router.post("/getDoctorConfirm", getDoctorConfirm);
router.post("/bookAppointment",getBookAppointment);




/*
Export
*/
module.exports = router;