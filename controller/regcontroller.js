/*
    importing internal dependencies 
*/

const database = require('../database/database');
const jwt = require('jsonwebtoken');

/*
For Rendering the login page For DOctor,Patient,Nurse and All;
*/
function getLoginAll(req,res,next){
    res.render('loginAll');
}

/*
For Rendering Reg Page For Doctor
*/
function getRegDoctor(req,res,next){
    res.render('regDoctor');
}

/*
For Rendering Reg Page For Receiptionist
*/
function getRegReceiptionist(req,res,next){
    res.render('regReceiptionist');
}

/*
For Rendering Reg Page For Patient
*/
function getRegPatient(req,res,next){
    res.render('regPatient');
}

/*
For Rendering Reg Page For Lab Assistant
*/
function getRegLabAssistant(req,res,next){
    res.render('regDoctor');
}


module.exports={
    getRegDoctor,
    getRegLabAssistant,
    getRegPatient,
    getRegReceiptionist
}