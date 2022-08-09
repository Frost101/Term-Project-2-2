/*
    importing internal dependencies 
*/

const database = require("../database/database");


function getDoctorHome(req,res,next){
    res.render('doctorHome');
}

function getDoctorPatientHistory(req,res,next){
    res.render('doctorPatientHistory');
}

function getDoctorEditPrescription(req,res,next){
    res.render('doctorEditPrescription');
}

function getUpcomingAppointments(req,res,next){
    res.render('doctorUpAppointments');
}

function getDoctorTestResults(req,res,next){
    res.render('doctorTestResults');
}

function getDoctorGivePrescription(req,res,next){
    res.render('doctorGivePrescription');
}

async function getTestNames(req,res){
    const sql=`
    SELECT TEST_NAME
    FROM TESTS
    `;
    const binds = {
    };
    let result = await database.execute(sql, binds);
    console.log(result);
    res.json(result.rows);
}

async function uploadPrescription(req,res){
    let sql=`UPDATE APPOINTMENTS
    SET DONE = 'Y',
     REMARKS = :REMARKS,
     ADVICE = :ADVICE,
    ROOM_REQ = :ROOM_REQ
    WHERE APPTID = :APPTID`;
    let binds = {
        APPTID:req.body.APPTID,
        REMARKS:req.body.REMARKS,
        ADVICE:req.body.ADVICE,
        ROOM_REQ:req.body.BED
    }
    let result = await database.execute(sql, binds);
    console.log(result);
    let testArr = req.body.TESTARR;
    console.log(testArr);
    for(let i=0; i<testArr.length; i++){
        sql=`INSERT INTO APPT_TESTS(APPTID, TEST_NAME) VALUES(:APPTID, :TEST_NAME)`;
        let binds2 = {
            APPTID:req.body.APPTID,
            TEST_NAME:testArr[i]
        }
        result = await database.execute(sql, binds2);
        console.log(result);
    }

    sql=`INSERT INTO APPT_MEDS(APPTID, MEDNAME) VALUES(:APPTID, :MEDNAME)`;
    let binds3={
        APPTID:req.body.APPTID,
        MEDNAME:req.body.MEDICINES
    }
    result = await database.execute(sql, binds3);
    console.log(result);
    res.json("success");
}

async function getAppointments(req,res){
    const sql=`
    SELECT APPTID, APPT_TIME, APPT_DATE, PID, P.FIRST_NAME ||' ' ||P.LAST_NAME PATIENT_NAME, P.PHONE, GET_AGE(P.DOB) AGE, P.BLOOD_GROUP 
    FROM 
    (SELECT * 
    FROM APPOINTMENTS 
    WHERE 
    DEID = :EID 
    AND REID IS NOT NULL 
    AND DONE = 'N' 
    AND APPT_DATE >= SYSDATE 
    ORDER BY APPT_DATE ASC) T1 
    JOIN  
    PATIENTS P USING (PID)
    `;
    const binds = {
        EID:req.body.EID
    };
    //console.log(binds.EID);
    let result = await database.execute(sql, binds);
    //console.log(result);
    res.json(result.rows);
}

async function getSingleAppointment(req,res){
    const sql=`
    SELECT APPTID, APPT_TIME, APPT_DATE, PID, P.FIRST_NAME ||' '|| P.LAST_NAME PATIENT_NAME, P.PHONE, GET_AGE(P.DOB) AGE, P.BLOOD_GROUP, DONE, REMARKS, ADVICE, ROOM_REQ 
    FROM 
    (SELECT * 
    FROM APPOINTMENTS 
    WHERE 
    APPTID = :APPTID) T1 
    JOIN  
    PATIENTS P USING (PID)
    `;
    const binds = {
        APPTID:req.body.APPTID
    };
    console.log(binds.APPTID);
    let result = await database.execute(sql, binds);
    console.log(result);
    res.json(result.rows);
}

/*
Export
*/
module.exports = {
    getDoctorHome,
    getDoctorPatientHistory,
    getDoctorEditPrescription,
    getUpcomingAppointments,
    getDoctorTestResults,
    getAppointments,
    getDoctorGivePrescription,
    getSingleAppointment,
    getTestNames,
    uploadPrescription
}