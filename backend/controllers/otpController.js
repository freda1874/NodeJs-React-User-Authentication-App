require('dotenv').config({ path: './backend/.env' });

const nodemailer = require("nodemailer");
const Otp = require("../models/otp");
const User = require("../models/user");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const generateNumericOTP = (length) => {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};

const sendOTPByEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Verify your email address to register",
    //text: `Your OTP for registration is: ${otp}`,
    html: `
      <div>
        <p>To verify your email address, please use the following One Time Password:</p>
        <h1 style="text-align:center;">${otp}</h1>
        <p>This OTP code will be expried in 5mins.</p>
        <p>Thank you!</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully to", email);
    return otp;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).json({
        status: "fail",
        message: "User already exists. Please login with your credential.",
        data: existingUser,
      });
    } else {
      const otp = generateNumericOTP(6);
      await Otp.create({ email, otp });
      await sendOTPByEmail(email, otp);

      return res.status(200).json({
        status: "success",
        message: "Sent a verifiaction code successfully",
        data: existingUser,
        otp: otp,
      });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while processing the request",
    });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpRecord = await Otp.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(200).json({
        status: "fail",
        message: "Invalid OTP",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while processing the request",
    });
  }
};
