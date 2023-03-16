const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { validate } = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");

// @desc Register new User
// @route Post/api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log("userData = ", name, email, password);

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Pls add all fields");
  }
  //check if user Exist
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(password, salt);

  //create password
  const user = await User.create(
    req.body
    // name,
    // email,
    // password: hashedPassword // values and keys must be same for a single keyword otherwise use key and value pair
  );

  if (user) {
    const token = generateToken(user.id);
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Authenticate a User
// @route Post/api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id);
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const logout = asyncHandler(async (req, res) => {
  req.cookies("token", null, {
    expires: new Date(Date.now),
    httpOnly: true,
  });

  res.status(00).json({
    sucess: true,
    message: "Log Out",
  });
});

// @desc Get User data
// @route Get/api/users/me
// @access Public
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

const forgetPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    throw new Error("User not found");
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetpasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetpasswordUrl} \n\nIf you have not requesyted this email then, please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    throw new Error(error.message);
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  forgetPassword,
  logout,
  getMe,
};
