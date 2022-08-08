/*
    importing internal dependencies 
*/

const database = require("../database/database");


function getDoctorHome(req,res,next){
    res.render('doctorHome');
}

function getDoctorPatientHistory(req,res,next){
    res.render('doctorPatientHistory');
}

function getDoctorEditPrescription(req,res,next){
    res.render('doctorEditPrescription');
}

function getUpcomingAppointments(req,res,next){
    res.render('doctorUpAppointments');
}

function getDoctorTestResults(req,res,next){
    res.render('doctorTestResults');
}


/*
Export
*/
module.exports = {
    getDoctorHome,
    getDoctorPatientHistory,
    getDoctorEditPrescription,
    getUpcomingAppointments,
    getDoctorTestResults
}