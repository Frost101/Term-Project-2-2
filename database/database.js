oracledb = require('oracledb')
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;


// creates connection for oracledb
async function startup() {
    console.log('starting up database.');
    let dbconnection = undefined;
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
    console.log('database started');
    return dbconnection;
}

// code to execute sql
async function execute(sql, binds){
    let connection, results;
    try {
        // Get a connection from the default pool
        connection = await startup();
        results = await connection.execute(sql, binds, options);
    } catch (err) {
        console.log("ERROR executing sql: " + err.message);
    } finally {
        if (connection) {
            try {
                // Put the connection back in the pool
                await connection.close();
            } catch (err) {
                console.log("ERROR closing connection: " + err);
            }
        }
    }
    return results;
}

// options for execution sql
const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT
}


module.exports = {
    execute
}