const nodemailer = require("nodemailer");

const User = require("../models/user");
const Role = require("../models/role");

const saveUser = async ({ email, first_name, last_name, created }) => {
  try {
    const role = await Role.findOne({ name: "Member" });

    if (!role) {
      throw new Error("Role not found");
    }

    const user = new User({
      email,
      first_name,
      last_name,
      created,
      isVerified: false,
      role_id: [role._id], // _id is Pk
    });
    await user.save();
    console.log("user data saved in saveUserToDB method");
    //console.log(user);
  } catch (error) {
    console.error("Error saving user to DB:", error);
    throw error;
  }
};

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

const sendOTPByEmail = async (email) => {
  const otp = generateNumericOTP(6);

  const mailOptions = {
    from: "OTP verification",
    to: email,
    subject: "Verify your email address to register",
    html: `
      <div>
        <p>To verify your email address, please use the following One Time Password:</p>
        <h1 style="text-align:center;">${otp}</h1>
        <p>Do not share this OTP with anyone.</p>
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

exports.checkUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    const otp = await sendOTPByEmail(email);
    // if the user already signed up
    if (!user) {
      const otp = await sendOTPByEmail(email);
      return res.status(200).json({
        status: "success",
        message: "User doesn't exist, need to register",
        data: user,
        otp: otp,
        redirectUrl: "/otp",
      });
    } else {
      return res.status(200).json({
        status: "success",
        message: "User already exists",
        data: user,
        redirectUrl: "/login",
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
