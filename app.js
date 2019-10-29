const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter.js");
const customErr = require("./errors/customErr.js");

app.use(express.json());

app.use("/api", apiRouter);

app.use(customErr);

module.exports = app;
