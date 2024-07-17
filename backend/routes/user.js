const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

//router.post("/check", userController.checkMembershipUser);

// To protect router, will use authController.protect as middleware
router.get("/userinfo", authController.protect, userController.getUserInfo);

// Admin-protected routes for User CRUD
// To restrict router for the certain role, will use authController.restrict as middleware
router.get(
  "/getAllUsers",
  authController.protect,
  authController.restrict("Administrator"),
  userController.getAllUsers
);

module.exports = router;
