const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  first_name: { type: String },
  last_name: { type: String },
  created: { type: Date, default: Date.now },
  password: { type: String },
  confirmPassword: {
    type: String,
    required: true,
    // This validator will only work for save and create
    validate: function (val) {
      return val == this.password;
    },
    message: "Password & Confirm Password does not match",
  },
  isVerified: { type: Boolean, default: false },
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
