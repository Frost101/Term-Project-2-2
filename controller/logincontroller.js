
/*
For Rendering the login page For DOctor,Patient,Nurse and All;
*/
function getLoginAll(req,res,next){
    res.render('loginAll');
}

/*
For Rendering the login page For Admin;
*/
function getLoginAdmin(req,res,next){
    res.render('loginAdmin');
}

/*
For Rendering the login page For Patient;
*/
function getLoginPatient(req,res,next){
    res.render('loginPatient');
}

/*
For Rendering the login page For Doctor;
*/
function getLoginDoctor(req,res,next){
    res.render('loginDoctor');
}

/*
For Rendering the login page For Nurse;
*/
function getLoginNurse(req,res,next){
    res.render('loginNurse');
}

/*
Export
*/
module.exports = {
    getLoginAll,
    getLoginAdmin,
    getLoginDoctor,
    getLoginPatient,
    getLoginNurse
}