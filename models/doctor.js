const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { default: validator } = require('validator');

//prepare schema for user
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'please provide email id'],
      validate: [validator.isEmail, 'Please provide valid email address'],
    },
    name: {
      type: String,
      required: [true, 'please provide your name'],
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, 'please provide password'],
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

// doucment middleware to encrypt the password before save
UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

//methods middleware to check the password with the database password

UserSchema.methods.checkPassword = async function (enteredPass, userPass) {
  return await bcrypt.compare(enteredPass, userPass);
};

//export the user
const User = mongoose.model('User', UserSchema);
module.exports = User;