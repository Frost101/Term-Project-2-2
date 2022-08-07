/*
    importing internal dependencies 
*/

const database = require("../database/database");


/*
For Rendering the Home page For Receptionist;
*/
function getReceptionistHome(req, res, next) {
    res.render("receptionistHome");
}

function getReceptionistApproveAppointments(req,res,next){
    res.render('receptionistApproveAppointments')
}

async function getAppointments(req,res){
    const sql = `
    SELECT APPTID, TO_CHAR(APPT_DATE) AS APPT_DATE, APPT_TIME, P.FIRST_NAME ||' '|| P.LAST_NAME PATIENT_NAME, T2.FIRST_NAME ||' '||T2.LAST_NAME DOCTOR_NAME, SPECIALITY ,DONE, REMARKS, ADVICE, ROOM_REQ, FEES, WID 
FROM 
( 
SELECT * 
FROM APPOINTMENTS 
WHERE REID IS NULL 
) T1 
JOIN 
( 
SELECT * 
FROM EMPLOYEES 
JOIN DOCTORS USING (EID) 
WHERE VERIFIED = 'Y' 
AND HID = :HID
) T2 
ON T1.DEID = T2.EID 
JOIN PATIENTS P USING (PID) 
WHERE APPT_DATE >= TO_CHAR(SYSDATE)
ORDER BY APPT_DATE ASC 
    `;
    const binds = {
        HID: req.body.HID
    };
    console.log(binds.HID);
    let result = await database.execute(sql, binds);
    console.log(result);
    res.json(result.rows);
}


async function getConfirmAppointment(req,res){
    console.log(req.body.APPTID);
    console.log(req.body.REID);
    const sql = `
    UPDATE APPOINTMENTS
    SET REID = :REID
    WHERE APPTID = :APPTID
    `;
    const binds = {
        APPTID: req.body.APPTID,
        REID:req.body.REID
    };
    let result = await database.execute(sql, binds);
    res.json("success");

}

async function getCancelAppointment(req,res){
    const sql = `
    DELETE FROM APPOINTMENTS
    WHERE APPTID = :APPTID
    `;
    const binds = {
        APPTID: req.body.APPTID
    };
    let result = await database.execute(sql, binds);
    console.log(result);
    res.json("success");
}

/*
Export
*/
module.exports = {
    getReceptionistHome,
    getReceptionistApproveAppointments,
    getAppointments,
    getConfirmAppointment,
    getCancelAppointment
}