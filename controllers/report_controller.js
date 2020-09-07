const Report = require('../models/report');
const catchAsync = require('../config/catchAsync');

//GET REPORTS BY STATUS
exports.getAllReportsByStatus = catchAsync(async (req, res, next) => {
  //find reports
  const reports = await Report.find({ status: req.params.status })
    .select('-__v -createdAt -updatedAt')
    .populate({
      path: 'patient',
      select: '-_id  -createdAt -updatedAt -__v ',
    })
    .populate({
      path: 'doctor',
      select: '-_id  -createdAt -updatedAt -__v ',
    })
    .sort('-createdAt');

  //send response
  return res.status(200).json({
    status: 'success',
    results: reports.length,
    data: reports,
  });
});