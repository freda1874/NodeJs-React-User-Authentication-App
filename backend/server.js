
const mongoose = require("mongoose");
const app = require("./app");
const Role = require("./models/role");
require('dotenv').config({ path: './backend/.env' });

const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASS;
const mongoHost = process.env.MONGO_HOST;
const mongoDbName = process.env.MONGO_DB_NAME;

const port = `mongodb+srv://${mongoUser}:${encodeURIComponent(mongoPass)}@${mongoHost}/${mongoDbName}?retryWrites=true&w=majority`;



mongoose.connect(port, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((conn) => {
    console.log("DB Connection Successful");
    initializeRoles();
    startServer();
  })
  .catch((error) => {
    console.error("DB Connection Error:", error);
  });

// Initializes predefined roles in the MongoDB database
async function initializeRoles() {
  const roles = [{ name: "Member" }, { name: "Admin" }];

  for (const role of roles) {
    const existingRole = await Role.findOne({ name: role.name });
    if (!existingRole) {
      const newRole = new Role(role);
      await newRole.save();
    }
  }

  console.log("Roles created successfully!");
}

function startServer() {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}
