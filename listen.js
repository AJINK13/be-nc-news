const app = require("./app.js")
const { port = 9090 } = process.env

app.listen(port, () => console.log(`Listening on ${port}`))