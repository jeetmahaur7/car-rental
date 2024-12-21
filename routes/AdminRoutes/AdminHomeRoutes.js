const AdminHomeRouter = require("express").Router()
const { encoder } = require("../../middleware/bodyParserMiddleware")
const { usersUploader } = require("../../middleware/multerMiddlerware")
const { isLogin } = require("../../middleware/roleCheckerMiddleware")
const { home, login, loginStore, logout, profileUpdate, profileUpdateStore } = require("../../controller/admin/homeController")

AdminHomeRouter.get("/", isLogin, home)
AdminHomeRouter.get("/login", login)
AdminHomeRouter.post("/login", encoder, loginStore)
AdminHomeRouter.get("/logout", logout)
AdminHomeRouter.get("/update-profile", isLogin, profileUpdate)
AdminHomeRouter.post("/update-profile", isLogin, encoder, usersUploader.single('pic'), profileUpdateStore)

module.exports = AdminHomeRouter
