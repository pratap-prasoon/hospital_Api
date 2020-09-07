const express = require('express');
const router = express.Router();
const passport = require('passport');
const patientController = require('../controllers/patient_controller');

//router to register the patient
router.post(
  '/register',
  passport.authenticate('jwt', { session: false }),
  patientController.registerPatient,
);

//route to create the report
router.post(
  '/:id/create_report',
  passport.authenticate('jwt', { session: false }),
  patientController.createReport,
);
// router to get the report with the patient id 
router.get('/:id/all_reports', patientController.getReports);

module.exports = router;