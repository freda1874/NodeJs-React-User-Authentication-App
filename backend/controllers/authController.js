const User = require("../models/user");
const Role = require("../models/role");
const jwt = require("jsonwebtoken");
const util = require("util");
const sendEmail = require("./../utils/email");
const crypto = require("crypto");
const { saveMemberToDB } = require("./userController");
const { encryptPassword } = require("../utils/encryption");

const signToken = (email) => {
  return jwt.sign({ email, iat: Math.floor(Date.now() / 1000) }, process.env.SECRET_STR, {
    // payload, secret string
    expiresIn: process.env.LOGIN_EXPIRE,
  });
};

exports.signup = async (req, res) => {
  const { email, nickname, created, password } = req.body;
  try {
    const userData = { email, nickname, created, password };
    await saveMemberToDB(userData);

    return res.status(200).json({
      status: "success",
      message: "Member saved successfully.",
      data: userData,
      redirectUrl: "/login",
    });
  } catch (error) {
    console.error("Error saving member:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  // If email or password is missing
  if (!email || !password) {
    return res.status(400).json({ message: "Please provide both email and password." });
  }

  try {
    const existingUser = await User.findOne({ email });
    console.log("User found:", existingUser);

    if (!existingUser) {
      return res.status(200).json({
        status: "fail",
        message: "user doesn't exist. Please sign up.",
        redirectUrl: "/",
      });
    }

    const passwordMatch = await existingUser.comparePassword(password);
    if (!passwordMatch) {
      return res.status(200).json({
        status: "fail",
        message: "Password doesn't match. Please try again.",
        redirectUrl: "/",
      });
    }

    const token = signToken(email);

    console.log("token from login: ", token);
    return res.status(200).json({
      status: "success",
      message: "Login successful",
      token,
      existingUser,
      redirectUrl: "/landing",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

exports.protect = async (req, res, next) => {
  //1. read the token & check if it exist
  let token;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "The token doesn't exist.",
    });
  }

  try {
    //2. validate the token
    const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRET_STR);
    console.log("decodedToken: ", decodedToken);

    //3. If the user exists
    const user = await User.findOne({ email: decodedToken.email });
    //await User.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "The user with the given token doesn't exist.",
      });
    }

    const isPasswordChanged = await user.isPasswordChanged(decodedToken.iat);

    //4. If the user changed password after the token was issued
    if (isPasswordChanged) {
      return res.status(401).json({
        status: "fail",
        message: "The password has been changed recently. Please login again.",
      });
    }
    //5. allow user to access route
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "fail",
        message: "Token expired. Please login again.",
      });
    }

    return res.status(401).json({
      status: "fail",
      message: "Invalid token.",
    });
  }
};

exports.restrict = (...allowedRoles) => {
  return async (req, res, next) => {
    const user = await User.findById(req.user._id).populate("roles", "name");
    const roleNames = user.roles.map((role) => role.name);

    console.log("roleNames:", roleNames);

    const hasPermission = allowedRoles.some((role) => roleNames.includes(role));

    if (!hasPermission) {
      return res.status(403).json({
        status: "fail",
        message: "You don't have permission to perform this action",
      });
    }
    next();
  };
};

exports.forgetPassword = async (req, res, next) => {
  //1. get user based on posted email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).json({
      status: "fail",
      message: "The user with the given email doesn't exist.",
    });
  }
  //2. create a random reset token
  const resetToken = user.createResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  //3. send the token back to the user email
  const frontendPort = process.env.FrontEnd_URL;
  const resetUrl = `${frontendPort}/reset-password/${resetToken}`;

  const message = `We have received a password reset request. Please use the below link to reset password\n\n${resetUrl}\n\nThis reset password link will be valid only for 10mins.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password change request recieved",
      text: message,
    });

    return res.status(200).json({
      status: "success",
      message: "Password reset link send to the user email",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpire = undefined;
    user.save({ validateFromSave: false });

    console.error("Error sending email:", error);

    return res.status(500).json({
      status: "fail",
      message: "There was an error sending password reset email. Please try again later.",
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  //1. If the user exixsts with the given token and token is not expired
  const token = crypto.createHash("sha256").update(req.params.token).digest("hex");
  const user = await User.findOne({ passwordResetToken: token, passwordResetTokenExpire: { $gt: Date.now() } });

  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "Token is invalid of has expired",
    });
  }

  const encryptedPassword = await encryptPassword(req.body.password);

  user.password = encryptedPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpire = undefined;
  user.passwordChangedAt = Date.now();
  await user.save();

  const email = user.email;
  const loginToken = signToken(email);

  return res.status(200).json({
    status: "success",
    message: "Your password changed successfully!",
    token: loginToken,
    redirectUrl: "/login",
  });
};
