const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    number: {
      type: Number,
      required: [true, "Please add a phone number"],
      unique: true,
      minLength: [10, "Enter a valid phone number"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"], //to be checked not storing password
      minLength: [8, "Must be greater than 8 characters"],
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.methods.getResetPasswordToken = function () {
  //Generate Token
  const resetToken = crypto.randomBytes(20);
  // hashing
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
