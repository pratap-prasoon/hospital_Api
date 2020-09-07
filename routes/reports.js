const express = require('express');
const router = express.Router();
const passport = require('passport');
const reportController = require('../controllers/report_controller');

//route to get the reports by status
router.get(
  '/:status',
  passport.authenticate('jwt', { session: false }),
  reportController.getAllReportsByStatus,
);

module.exports = router;