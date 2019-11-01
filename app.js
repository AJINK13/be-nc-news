const express = require("express")
const app = express()
const apiRouter = require("./routes/apiRouter.js")
const routeErr = require("./errors/routeErr.js")
const customErr = require("./errors/customErr.js")
const psqlErr = require("./errors/psqlErr.js")

app.use(express.json())

app.use("/api", apiRouter)
app.all("/*", routeErr)
app.use(psqlErr)
app.use(customErr)

module.exports = app
