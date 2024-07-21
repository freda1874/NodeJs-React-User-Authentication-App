// CONNECT DATABASE
const dotenv = require("dotenv");
dotenv.config(); // load environment variables from .env file
const mongoose = require("mongoose");
const app = require("./app");
const Role = require("./models/role");
console.log(process.env);



mongoose
  .connect(process.env.MONGODB_URI, {
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
