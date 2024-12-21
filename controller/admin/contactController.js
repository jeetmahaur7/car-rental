const Contact = require("../../models/Contact")

async function home(req, res) {
    try {
        const data = await Contact.find().sort({ _id: -1 })
        res.render("admin/contact/index", { session: req.session, title: "Admin Contact Section", data: data })
    } catch (error) {
        console.log(error)
    }
}

async function show(req, res) {
    try {
        const data = await Contact.findOne({ _id: req.params._id })
        res.render("admin/contact/show", { session: req.session, title: "Admin Contact Section", data: data })
    } catch (error) {
        console.log(error)
        res.redirect("/admin/contact")
    }
}

async function edit(req, res) {
    try {
        const data = await Contact.findOne({ _id: req.params._id })
        data.active = false
        await data.save()
        res.render("admin/contact/show", { session: req.session, title: "Admin Contact Section", data: data})
    } catch (error) {
        console.log(error)
        res.redirect("/admin/contact")
    }
}


async function remove(req, res) {
    try {
        const data = await Contact.findOne({ _id: req.params._id })
        await data.deleteOne()
        res.redirect("/admin/contact")
    } catch (error) {
        console.log(error)
        res.redirect("/admin/contact")
    }
}
module.exports = { home, remove, edit, show }