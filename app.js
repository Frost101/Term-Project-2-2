/*
Importing  External Dependencies
*/
const express = require('express');
const dotenv = require('dotenv');
const oracledb = require('oracledb');
const path = require('path');
const cookieParser = require('cookie-parser');



/*
Importing Internal Dependencies
*/
const loginRouter = require('./router/loginRouter');
const {notFoundHandler,errorHandler} = require('./middlewares/common-middlewares/errorHandler');

/*
Changing the return type of oracledb queries to JSON object
*/
oracledb.outFormat = oracledb.OBJECT;

/*
Create app Router
*/
const app = express();


/*
App helpers
*/
app.use(express.json());    //To Parse JSON data
app.use(express.urlencoded({extended:true}));   // To Parse HTML form data and 'extended:true' => now it can parse query data
app.use(express.static(path.join(__dirname,"public")));     //Setting up static Folders
app.use(cookieParser(process.env.COOKIE_SECRET));  //To Parse Cookies



/*
Set view Engine
=>Default folder : 'views'
*/
app.set("view engine","ejs");


/*
To access the env variables by 'process.env.varname'
*/
dotenv.config();


/*
Establish database connection
*/
let dbconnection = undefined;
async function databaseConnection(){
    if(dbconnection===undefined){
        dbconnection = await oracledb.getConnection({
            /*
            we are importing variables from .env file by using 'process.env.varName'
            */
            user: process.env.ORACLE_USER,
            password: process.env.ORACLE_PASSWORD,
            connectString: process.env.ORACLE_CONNECT_STRING
        })
    }
}


/*
Routing Setup
*/
app.use('/',loginRouter);



/*
Error Handling
=>Common Error Handler,Should be the last middleware
*/
//404 Not Found Handler
app.use(notFoundHandler);

//Common error  handler
app.use(errorHandler);





app.listen(process.env.PORT, ()=>{
    console.log('LIstening....');
})
