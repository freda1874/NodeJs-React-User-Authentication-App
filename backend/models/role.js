const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});
// Use createIndexes for indexes
roleSchema.index({ name: 1 }, { unique: true });
const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
