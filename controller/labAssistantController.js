/*
    importing internal dependencies 
*/

const database = require("../database/database");


function getLabAssistantHome(req,res,next){
    res.render('labAssistantHome');
}

function getLabAssistantUpcomingTests(req,res,next){
    res.render('labAssistantUpcomingTests');
}

function getLabAssistantEditTests(req,res,next){
    res.render('labAssistantEditTests');
}


/*
Export
*/
module.exports = {
    getLabAssistantHome,
    getLabAssistantUpcomingTests,
    getLabAssistantEditTests
}