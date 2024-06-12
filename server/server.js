require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const {log} = require("mercedlogger")
const cors = require("cors")
const UserRouter = require("./controllers/User")

const {PORT = 5432} = process.env

const app = express()

app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("this is the test route to make sure server is working")
})
app.use("/user", UserRouter)

app.listen(PORT, () => log.green("SERVER STATUS", `Listening on port ${PORT}`))