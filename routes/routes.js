const router = require("express").Router()
const {
    homePage,
    aboutPage,
    servicePage,
    featurePage,
    testimonialPage,
    contactUsPage,
    errorPage,
    carsPage,
    contactUsStorePage,
    bookingPage,
    bookingStorePage,
    bookingConfirmation
} = require("../controller/frontController")
const { encoder } = require("../middleware/bodyParserMiddleware")
const AdminHomeRouter = require("./AdminRoutes/AdminRoutes")

router.get("/", homePage)
router.get("/booking", bookingPage)
router.post("/booking", encoder, bookingStorePage)
router.get("/about", aboutPage)
router.get("/service", servicePage)
router.get("/feature", featurePage)
router.get("/cars", carsPage)
router.get("/testimonials", testimonialPage)
router.get("/contact", contactUsPage)
router.post("/contact", encoder, contactUsStorePage)
router.get("/booking-confirmation", bookingConfirmation)


//Admin Routes
router.use("/admin", AdminHomeRouter)

router.get("/*", errorPage)

module.exports = router