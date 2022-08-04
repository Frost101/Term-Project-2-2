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
For Rendering the login page For Admin;
*/
function getLoginAdmin(req,res,next){
    res.render('loginAdmin');
}

async function doLoginAdmin(req,res){
    const sql = `
          SELECT *
          FROM ADMIN
          WHERE EMAIL = :email
          AND PASSWORD = :password`;
    const binds = {
        email: req.body.email,
        password: req.body.password
    }
    let result = await database.execute(sql,binds);
    console.log(result);
    if(result.rows.length != 1) {
        res.json('Bad Login')
    }
    else {
        res.json(result.rows);
    }

}


/*
For Rendering the login page For Receiptionist;
*/
function getLoginReceiptionist(req,res,next){
    res.render('loginReceiptionist');
}

async function doLoginReceiptionist(req,res){
    const sql = `
          SELECT *
          FROM RECEIPTIONISTS
          WHERE EMAIL = :email
          AND PASSWORD = :password`;
    const binds = {
        email: req.body.email,
        password: req.body.password
    }
    let result = await database.execute(sql,binds);
    console.log(result);
    if(result.rows.length != 1) {
        res.json('Bad Login')
    }
    else {
        res.json(result.rows);
    }

}


/*
For Rendering the login page For Lab Assistant;
*/
function getLoginLabAssistant(req,res,next){
    res.render('loginLabAssistant');
}

async function doLoginLabAssistant(req,res){
    const sql = `
          SELECT *
          FROM LAB_ASSISTANTS
          WHERE EMAIL = :email
          AND PASSWORD = :password`;
    const binds = {
        email: req.body.email,
        password: req.body.password
    }
    let result = await database.execute(sql,binds);
    console.log(result);
    if(result.rows.length != 1) {
        res.json('Bad Login')
    }
    else {
        res.json(result.rows);
    }

}

/*
For Rendering the login page For Patient;
*/
function getLoginPatient(req,res,next){
    res.render('loginPatient');
}


async function doLoginPatient(req,res){
    const sql = `
          SELECT *
          FROM PATIENTS
          WHERE EMAIL = :email
          AND PASSWORD = :password`;
    const binds = {
        email: req.body.email,
        password: req.body.password
    }
    let result = await database.execute(sql,binds);
    console.log(result);
    if(result.rows.length != 1) {
        const userObject={
            success:false
        }
        res.json(userObject);
    }
    else {
        const userObject = {
            EMAIL:result.rows[0].EMAIL,
            ROLE: "patient",
            PID:result.rows[0].PID,
            FIRST_NAME:result.rows[0].FIRST_NAME,
            LAST_NAME:result.rows[0].LAST_NAME,
            success:true
        }

        //generate token
        const token =  jwt.sign(userObject, process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXPIRY
        });

        //set cookie
        res.cookie(process.env.COOKIE_NAME,token,{
            maxAge: process.env.JWT_EXPIRY,
            httpOnly:true,
            signed:true,
        });
        res.locals.loggedInUser = userObject;
        res.json(userObject);
    }

}


/*
For Rendering the login page For Doctor;
*/
function getLoginDoctor(req,res,next){
    res.render('loginDoctor');
}

async function doLoginDoctor(req,res){
    const sql = `
          SELECT *
          FROM DOCTORS
          WHERE EMAIL = :email
          AND PASSWORD = :password`;
    const binds = {
        email: req.body.email,
        password: req.body.password
    }
    let result = await database.execute(sql,binds);
    console.log(result);
    if(result.rows.length != 1) {
        res.json('Bad Login')
    }
    else {
        res.json(result.rows);
    }

}


/*
logout
*/

function logout(req,res){
    res.clearCookie(process.env.COOKIE_NAME);
}

/*
Export
*/
module.exports = {
    getLoginAll,
    getLoginAdmin,
    getLoginDoctor,
    getLoginPatient,
    getLoginReceiptionist,
    getLoginLabAssistant,
    doLoginPatient,
    doLoginAdmin,
    doLoginDoctor,
    doLoginLabAssistant,
    doLoginReceiptionist,
    logout
}