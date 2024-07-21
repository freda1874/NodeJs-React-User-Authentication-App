//IMPORT PACKAGE
const express = require("express");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const otpRouter = require("./routes/otp");
const cors = require("cors");
const path = require('path');

let app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});
//CORS middleware
app.use(cors());

//USING ROUTES
app.use("/api/user", userRouter);
app.use("/api/otp", otpRouter);
app.use("/api/auth", authRouter);

module.exports = app;
