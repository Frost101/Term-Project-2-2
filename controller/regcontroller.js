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
function getRegReceptionist(req,res,next){
    res.render('regReceptionist');
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
    res.render('regLabAssistant');
}


async function doRegPatient(req,res){
    const sql = `

    `;
    const binds = {
        
    }

    let result = await database.execute(sql,binds);
    console.log(result);
    const userObject = {
        success:true
    }
    res.json(userObject);
}


async function doRegDoctor(req,res){
    const sql = `

    `;
    const binds = {
        
    }

    let result = await database.execute(sql,binds);
    console.log(result);
    const userObject = {
        success:true
    }
    res.json(userObject);
}

async function doRegLabAssistant(req,res){
    const sql = `

    `;
    const binds = {
        
    }

    let result = await database.execute(sql,binds);
    console.log(result);
    const userObject = {
        success:true
    }
    res.json(userObject);
}

async function doRegReceptionist(req,res){
    const sql = `

    `;
    const binds = {
        
    }

    let result = await database.execute(sql,binds);
    console.log(result);
    const userObject = {
        success:true
    }
    res.json(userObject);
}



module.exports={
    getRegDoctor,
    getRegLabAssistant,
    getRegPatient,
    getRegReceptionist,
    doRegPatient,
    doRegDoctor,
    doRegLabAssistant,
    doRegReceptionist
}