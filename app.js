/*
Importing  External Dependencies
*/
const express = require('express');
const dotenv = require('dotenv');
const oracledb = require('oracledb');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');



/*
Importing Internal Dependencies
*/
const loginRouter = require('./router/loginRouter');
const regRouter = require("./router/regRouter");
const patientRouter = require("./router/patientRouter");
const doctorRouter = require("./router/doctorRouter");
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
To access the env variables by 'process.env.varname'
*/
dotenv.config();

/*
App helpers
*/
app.use(express.json());    //To Parse JSON data
app.use(express.urlencoded({extended:true}));   // To Parse HTML form data and 'extended:true' => now it can parse query data
app.use(express.static(path.join(__dirname,"public")));     //Setting up static Folders
app.use(express.static(path.join(__dirname,"public/js"))); 
app.use(express.static(path.join(__dirname,"public/images"))); 
app.use(express.static(path.join(__dirname,"public/css")));
app.use(cookieParser(process.env.JWT_SECRET));  //To Parse Cookies
// console.log(process.env.PORT);
// app.use(cookieParser('fndjkbfbj'));  //To Parse Cookies
app.use(cors());
app.options('*',cors());



/*
Set view Engine
=>Default folder : 'views'
*/
app.set("view engine","ejs");





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
            connectString: process.env.ORACLE_CONNECT_STRING,
        })
    }
    return dbconnection;
}


/*
Routing Setup
*/
app.use('/',loginRouter);
app.use('/reg',regRouter);
app.use('/patient',patientRouter);
app.use('/doctor',doctorRouter);
app.use('/test',async (req,res)=>{
    let db = await databaseConnection();
    let result = await db.execute('SELECT * FROM employees',[]);
    console.log(result);
    res.send(result.rows);
    res.end();
});
app.use('/test1',(req,res)=>{
    res.render('test');
});



/*
Error Handling
=>Common Error Handler,Should be the last middleware
*/
//404 Not Found Handler
app.use(notFoundHandler);

//Common error  handler
app.use(errorHandler);





app.listen(process.env.PORT, ()=>{
    console.log('Listening....');
})


module.exports = {
    databaseConnection
}