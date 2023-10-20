const express = require("express");
const routers = express.Router();

// user routes
routers.use("/", require("./users"));

// student routes
routers.use("/student", require("./student"));

// interview routes
routers.use("/interview", require("./interview"));

module.exports = routers;