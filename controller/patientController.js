/*
    importing internal dependencies 
*/

const database = require("../database/database");

/*
For Rendering the Home page For Patient;
*/
function getPatientHome(req, res, next) {
  res.render("patientHome");
}

/*
For Rendering the Book Appointments page For Patient;
*/
function getPatientAppointments(req, res, next) {
  res.render("patientAppointments");
}

function getPatientAppointmentsHistory(req, res, next) {
  res.render("patientAppointmentHistory");
}

function getPatientHireAmbulance(req, res, next) {
  res.render("patientHireAmbulance");
}

function getPatientHireNurse(req, res, next) {
  res.render("patientHireNurse");
}

function getPatientTest(req, res, next) {
  res.render("patientTest");
}

function getPatientUpcomingAppointments(req, res, next) {
  res.render("patientUpcomingAppointments");
}

function getPatientAppointmentConfirm(req,res,next){
    res.render('patientAppointmentConfirm');
}

async function getDoctor(req, res) {
  const sql = `
  DECLARE
    c1 SYS_REFCURSOR;
    c2 SYS_REFCURSOR;
		c3 SYS_REFCURSOR;
  BEGIN
    OPEN c1 FOR SELECT DISTINCT EID, FIRST_NAME || ' ' || LAST_NAME AS NAME, SPECIALITY, FEES, GENDER, ADDRESS, HOSPITAL_NAME
											FROM EMPLOYEES
											JOIN HOSPITALS USING (HID)
											JOIN DOCTORS USING (EID)
											WHERE VERIFIED = 'Y'
											AND BRANCH = :BRANCH
											AND SPECIALITY = :SPECIALITY;
    DBMS_SQL.RETURN_RESULT(c1);

    OPEN c2 FOR SELECT DISTINCT EID, DEGREE
								FROM EMPLOYEES
								JOIN HOSPITALS USING (HID)
								JOIN DOCTORS USING (EID)
								JOIN DOC_DEGREES USING (EID)
								WHERE VERIFIED = 'Y'
								AND BRANCH = :BRANCH
								AND SPECIALITY = :SPECIALITY;
    DBMS_SQL.RETURN_RESULT(c2);
		
		OPEN c3 FOR SELECT DISTINCT EID, VIS_FROM, VIS_TO
								FROM EMPLOYEES
								JOIN HOSPITALS USING (HID)
								JOIN DOCTORS USING (EID)
								JOIN DOC_VIS_TIME USING (EID)
								WHERE VERIFIED = 'Y'
								AND BRANCH = :BRANCH
								AND SPECIALITY = :SPECIALITY;
    DBMS_SQL.RETURN_RESULT(c3);
  END;
  `;
  const binds = {
    BRANCH: req.body.BRANCH,
    SPECIALITY: req.body.SPECIALITY,
  };

  let result = await database.execute(sql, binds);
  let docObjArr = [];
  let temp = result.implicitResults;
  for (let j = 0; j < temp[0].length; j++) {
    let docObj = {};
    docObj.EID = temp[0][j].EID;
    docObj.NAME = temp[0][j].NAME;
    docObj.SPECIALITY = temp[0][j].SPECIALITY;
    docObj.FEES = temp[0][j].FEES;
    docObj.GENDER = temp[0][j].GENDER;
    docObj.ADDRESS = temp[0][j].ADDRESS;
    docObj.HOSPITAL_NAME = temp[0][j].HOSPITAL_NAME;
    docObj.DEGREE = "";
    docObjArr.push(docObj);
  }
 
  for(let i=0; i<temp[1].length;i++){
    for(let j=0; j<docObjArr.length; j++){
        if(docObjArr[j].EID === temp[1][i].EID){
            docObjArr[j].DEGREE += (temp[1][i].DEGREE + " ");
            break;
        }
    }
  }
  res.json(docObjArr);
}



async function getDoctorConfirm(req,res){
    const sql = `
    DECLARE
    c1 SYS_REFCURSOR;
    c2 SYS_REFCURSOR;
	c3 SYS_REFCURSOR;
    BEGIN
    OPEN c1 FOR SELECT DISTINCT EID, FIRST_NAME || ' ' || LAST_NAME AS NAME, SPECIALITY, FEES, GENDER, E.EMAIL, E.PHONE, ADDRESS, HOSPITAL_NAME,BRANCH
				FROM EMPLOYEES E
                JOIN DOCTORS USING (EID)
                JOIN HOSPITALS USING(HID)
                WHERE EID = :EID;
    DBMS_SQL.RETURN_RESULT(c1);

    OPEN c2 FOR SELECT DISTINCT DEGREE
                FROM DOC_DEGREES
                WHERE EID = :EID;
    DBMS_SQL.RETURN_RESULT(c2);
		
		OPEN c3 FOR SELECT DISTINCT VIS_FROM, VIS_TO
                    FROM DOC_VIS_TIME
                    WHERE EID = :EID;
    DBMS_SQL.RETURN_RESULT(c3);
  END;
    `;
    const binds = {
        EID:req.body.EID
    };
    let result = await database.execute(sql, binds);
    let temp = result.implicitResults;
    let docObj = {};
    docObj.EID = temp[0][0].EID;
    docObj.NAME = temp[0][0].NAME;
    docObj.SPECIALITY = temp[0][0].SPECIALITY;
    docObj.FEES = temp[0][0].FEES;
    docObj.GENDER = temp[0][0].GENDER;
    docObj.EMAIL = temp[0][0].EMAIL;
    docObj.PHONE = temp[0][0].PHONE;
    docObj.ADDRESS = temp[0][0].ADDRESS;
    docObj.BRANCH = temp[0][0].BRANCH;
    docObj.DEGREE = "";
    docObj.VIS_TIME = [];

    for(let i = 0; i < temp[1].length; i++) {
        docObj.DEGREE += (temp[1][i].DEGREE + " ");;
    }

    docObj.DEGREE = docObj.DEGREE.trim();

    for(let i = 0; i < temp[2].length; i++) {
        let vis_time_str = temp[2][i].VIS_FROM + " - " + temp[2][i].VIS_TO;
        docObj.VIS_TIME.push(vis_time_str);
    }

    res.json(docObj);
}



async function getBookAppointment(req,res){

    console.log(req.body.DEID);
    console.log(req.body.PID);
    console.log(req.body.APPT_TIME);
    console.log(req.body.APPT_DATE);
    const sql = `
    INSERT INTO APPOINTMENTS(APPTID, APPT_TIME, PID, DEID, APPT_DATE) VALUES('APPT_' || APPT_SEQ.NEXTVAL, :APPT_TIME, :PID, :DEID, TO_DATE(:APPT_DATE, 'YYYY-MM-DD'))
    `;
    const binds = {
        DEID:req.body.DEID,
        PID:req.body.PID,
        APPT_TIME:req.body.APPT_TIME,
        APPT_DATE:req.body.APPT_DATE
    };
    let result = await database.execute(sql, binds);

}

/*
Export
*/
module.exports = {
  getPatientHome,
  getPatientAppointments,
  getPatientAppointmentsHistory,
  getPatientHireAmbulance,
  getPatientHireNurse,
  getPatientTest,
  getPatientUpcomingAppointments,
  getPatientAppointmentConfirm,
  getDoctor,
  getDoctorConfirm,
  getBookAppointment
};
