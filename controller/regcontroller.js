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

async function doRegPatient(req,res){
    console.log(req.body);
    console.log(req.body.dob);
    console.log(req.body.password);
    const sql = `
        INSERT INTO PATIENTS
        VALUES(:nid, :firstName, :lastName, TO_DATE('17/10/2000', 'DD/MM/YYYY'), :age, :phone, :email, :password)`;
    const binds = {
        nid: req.body.nid,
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        age:req.body.age,
        phone:req.body.phoneNumber,
        email:req.body.email,
        password:req.body.password
    }

    let result = await database.execute(sql,binds);
    console.log(result);
    const userObject = {
        success:true
    }
    res.json(userObject);
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
    getRegReceiptionist,
    doRegPatient
}