const Booking = require("../../models/Booking")

async function home(req, res) {
    try {
        const data = await Booking.find().sort({ _id: -1 })
        res.render("admin/booking/index", { session: req.session, title: "Admin Booking Section", data: data })
    } catch (error) {
        console.log(error)
    }
}

async function show(req, res) {
    try {
        const data = await Booking.findOne({ _id: req.params._id })
        res.render("admin/booking/show", { session: req.session, title: "Admin Booking Section", data: data })
    } catch (error) {
        console.log(error)
        res.redirect("/admin/booking")
    }
}

async function edit(req, res) {
    try {
        const data = await Booking.findOne({ _id: req.params._id })
        data.active = false
        await data.save()
        res.render("admin/booking/show", { session: req.session, title: "Admin Booking Section", data: data})
    } catch (error) {
        console.log(error)
        res.redirect("/admin/booking")
    }
}


async function remove(req, res) {
    try {
        const data = await Booking.findOne({ _id: req.params._id })
        await data.deleteOne()
        res.redirect("/admin/booking")
    } catch (error) {
        console.log(error)
        res.redirect("/admin/booking")
    }
}
module.exports = { home, remove, edit, show }