  
const Patient = require('../models/patient');
const Report = require('../models/report');
const ApiError = require('../config/ApiError');
const catchAsync = require('../config/catchAsync');

//TO RESGISTER PATIENT
exports.registerPatient = catchAsync(async (req, res, next) => {
  const { phoneNumber, name } = req.body;

  //if patient is found then give report
  let patient = await Patient.findOne({ phoneNumber }).populate({
    path: 'report',
    populate: { path: 'doctor patient', select: 'name email phoneNumber' },
  });

  //if patient is not found then create
  if (!patient) {
    patient = await Patient.create({ phoneNumber, name });
  }

  //to send response
  res.status(200).json({
    status: 'success',
    data: {
      patient,
    },
  });
});

//TO CREATE REPORT
exports.createReport = catchAsync(async (req, res, next) => {
  //find patient
  const patient = await Patient.findById(req.params.id);
  //if patient not found then throw an error
  if (!patient) {
    return next(new ApiError('Patient Not Found', 401));
  }
  // if patient found then create report
  req.body.patient = req.params.id;
  req.body.doctor = req.user._id;
  let report = await Report.create(req.body);

  //popualte doctor details
  report = await report.populate('doctor', 'name email').execPopulate();
  //popualte patient details
  report = await report.populate('patient', 'name phoneNumber').execPopulate();

  //send reponse
  res.status(201).json({
    status: 'success',
    data: {
      report,
    },
  });
});

//GET REPORT BY PATIENT ID
exports.getReports = catchAsync(async (req, res, next) => {
  //find patient
  const patient = await Patient.findById(req.params.id);

  //if patient not found then throw an error
  if (!patient) {
    return next(new ApiError('patient Not Found', 404));
  }

  //if patient found then find reports(oldest to newest)
  const reports = await Report.find({ patient: req.params.id })
    .sort({ date: 1 })
    .populate({ path: 'doctor', select: 'name email -_id' })
    .populate({ path: 'patient', select: 'phoneNumber name -_id' });

  //send response
  res.status(200).json({
    status: 'success',
    results: reports.length,
    data: reports,
  });
});