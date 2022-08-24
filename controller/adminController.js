/*
    importing internal dependencies 
*/
const database = require("../database/database");


function getAdminHome(req,res,next){
    res.render('adminHome');
}

function getAdminApproveDoctor(req,res,next){
    res.render('adminApproveDoctor');
}

function getAdminApproveReceptionist(req,res,next){
    res.render('adminApproveReceptionist');
}

function getAdminApproveLabAssistant(req,res,next){
    res.render('adminApproveLabAssistant');
}


/*
Export
*/
module.exports = {
    getAdminHome,
    getAdminApproveDoctor,
    getAdminApproveReceptionist,
    getAdminApproveLabAssistant
}