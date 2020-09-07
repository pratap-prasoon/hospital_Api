const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//prepare schema of report
const ReportSchema = new Schema(
  {
    doctor: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Reports belongs to the doctor'],
    },
    status: {
      type: String,
      required: [true, 'status of patient'],
      enum: {
        values: [
          'Negative',
          'Travelled-Quarantine',
          'Symptoms-Quarantine',
          'Positive-Admit',
        ],
        message:
          'status either : Negative ,Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit',
      },
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    patient: {
      type: mongoose.Schema.ObjectId,
      ref: 'Patient',
      required: [true, 'Reports belongs to the patient'],
    },
  },
  {
    timestamps: true,
  },
);

// export models
const Report = mongoose.model('Report', ReportSchema);
module.exports = Report;