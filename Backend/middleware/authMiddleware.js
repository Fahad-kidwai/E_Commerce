const jwt = require("jsonwebtoken");
const asyncHanndler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHanndler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized,no token");
  }
});

const authorizedRoles = (...roles) => {
  return asyncHanndler(async (req, res, next) => {
    console.log("role", req.user);
    if (!roles.includes(req.user.role)) {
      throw new Error("Admin Action!! you can't peform this action");
    }
    next();
  });
};

module.exports = { protect, authorizedRoles };
