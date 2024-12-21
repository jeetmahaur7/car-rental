const express = require("express")
const hbs = require("hbs")
const session = require("express-session")

require("dotenv").config()

const app = express()
app.set("view engine", "hbs")
hbs.registerPartials("./views/partials")
app.use(express.static("./public"))         //this line is used to set path of public folder which contains css,js and images
app.use("/public",express.static("./public"))//use this line to server public folder

app.use(session({
    secret: process.env.SESSION_SECERT_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}))

require("./helpers/index.js")
require("./db_connect.js")


const router = require("./routes/routes")
app.use("", router)

app.listen(8000, console.log("Server is Running at http://localhost:8000"))

