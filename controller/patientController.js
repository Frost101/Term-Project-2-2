/*
    importing internal dependencies 
*/

const database = require('../database/database');


/*
For Rendering the Home page For Patient;
*/
function getPatientHome(req,res,next){
    res.render('patientHome');
}


/*
For Rendering the Book Appointments page For Patient;
*/
function getPatientAppointments(req,res,next){
    res.render('patientAppointments');
}



/*
Export
*/
module.exports = {
    getPatientHome,
    getPatientAppointments
}