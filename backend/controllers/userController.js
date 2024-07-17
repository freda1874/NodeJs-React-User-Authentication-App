const User = require("../models/user");
const Role = require("../models/role");
const { encryptPassword } = require("../utils/encryption");

exports.saveMemberToDB = async (userData) => {
  try {
    const role = await Role.findOne({ name: "Member" });

    if (!role) {
      throw new Error("Role not found");
    }
    const encryptedPassword = await encryptPassword(userData.password);

    const user = new User({
      ...userData,
      password: encryptedPassword,
      roles: [role._id], // _id is Pk
    });
    await user.save();
    console.log("user data saved in saveUserToDB method");
  } catch (error) {
    console.error("Error saving user to DB:", error);
    throw error;
  }
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((prop) => {
    if (allowedFields.includes(prop)) newObj[prop] = obj[prop];
  });
  return newObj;
};

// exports.checkMembershipUser = async (req, res) => {
//   const { email } = req.body;
//   try {
//     const userData = await getUserDataFromMockFile(email);
//     console.log("userData:", userData);

//     if (userData) {
//       return res.status(200).json({
//         status: "success",
//         message: "User data fetched from mock data/EventBrite and saved to the database",
//         data: userData,
//       });
//     } else {
//       return res.status(200).json({
//         status: "fail",
//         message: "User not found in mock data/EventBrite, please sign up as new user",
//       });
//     }
//   } catch (error) {
//     console.error("An error occurred:", error);
//     return res.status(500).json({
//       status: "error",
//       message: "An error occurred while processing the request",
//     });
//   }
// };

exports.getUserInfo = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: {
        user: req.user,
      },
    });
    console.log("user info:", req.user);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch user info.",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    //Populate the roles field to fetch role names
    const users = await User.find().populate("roles", "name");

    const usersWithRoleNames = users.map((user) => ({
      ...user.toObject(),
      roles: user.roles.map((role) => role.name),
    }));

    res.status(200).json({
      status: "success",
      results: usersWithRoleNames.length,
      data: { users: usersWithRoleNames },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch users.",
    });
  }
};
