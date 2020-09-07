const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor_controller');

//router to registration and login the user
router.post('/register', doctorController.create);
router.post('/login', doctorController.createSession);

module.exports = router;