
const express = require('express');
const {getRegDoctor,getRegPatient,getRegReceiptionist,getRegLabAssistant,doRegPatient} = require('../controller/regcontroller');
const decorateHTMLResponse = require("../middlewares/common-middlewares/decorateHTMLResponse");

/*
Creating a router
*/
const router = express.Router();

/*
Routing Setup
*/
router.get("/regPatient",decorateHTMLResponse('Reg Patient'),getRegPatient);
router.get("/regDoctor",decorateHTMLResponse("Reg Doctor"),getRegDoctor);
router.get("/regReceiptionist",decorateHTMLResponse("Reg Receiptionist"),getRegReceiptionist);
router.get("/regLabAssistant",decorateHTMLResponse("Reg LabAssistant"),getRegLabAssistant);
router.post("/regPatient",doRegPatient);


/*
Export
*/
module.exports = router;