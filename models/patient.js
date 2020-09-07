const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//prepare shema for patient
const PatientSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      required: [true, 'mobile number'],
      unique: true,
      minlength: [10, 'Mobile Number at least 10 digit'],
      maxlength: [10, 'Mobile number at most 10 digit'],
    },
    name: {
      type: String,
      required: [true, 'name of the patient'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

//virtual middle to populate the report
PatientSchema.virtual('report', {
  ref: 'Report',
  foreignField: 'patient',
  localField: '_id',
});

// export models
const Patient = mongoose.model('Patient', PatientSchema);
module.exports = Patient;