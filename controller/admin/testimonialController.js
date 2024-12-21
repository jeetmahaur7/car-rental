const Testimonial = require("../../models/Testimonial")

async function home(req, res) {
    try {
        const data = await Testimonial.find().sort({ _id: -1 })
        res.render("admin/testimonial/index", { session: req.session, title: "Admin Testimonial Section", data: data })
    } catch (error) {
        console.log(error)
    }
}
function create(req, res) {
    res.render("admin/testimonial/create", { session: req.session, title: "Admin Testimonial Section", data: {}, error: {} })
}

async function store(req, res) {
    try {
        var data = new Testimonial(req.body)
        if (req.file) {
            data.pic = req.file.path
        }
        await data.save()
        res.redirect("/admin/testimonial")
    }
    catch (error) {
        console.log(error)
        errorMessage = {}
        error.errors?.name ? (errorMessage['name'] = error.errors?.name.message) : ""
        error.errors?.message ? (errorMessage['message'] = error.errors?.message.message) : ""
        error.errors?.pic ? (errorMessage['pic'] = error.errors?.pic.message) : ""
        res.render("admin/testimonial/create", { errorMessage: errorMessage, data: data })
    }
}

async function edit(req, res) {
    try {
        const data = await Testimonial.findOne({ _id: req.params._id })
        res.render("admin/testimonial/edit", { session: req.session, title: "Admin Testimonial Section", data: data, error: {} })
    } catch (error) {
        console.log(error)
        res.redirect("/admin/testimonial")
    }
}

async function update(req, res) {
    try {
        var data = await Testimonial.findOne({ _id: req.params._id })
        data.name = req.body.name
        data.message = req.body.message
        data.active = req.body.active
        if (req.file) {
            try {
                const fs = require("fs")
                fs.unlinkSync(data.pic)
            } catch (error) { }
            data.pic = req.file.path
        }
        await data.save()
        res.redirect("/admin/testimonial")
    } catch (error) {
        console.log(error)
        errorMessage = {}
        error.errors?.name ? (errorMessage['name'] = error.errors?.name.message) : ""
        error.errors?.message ? (errorMessage['message'] = error.errors?.message.message) : ""
        error.errors?.pic ? (errorMessage['pic'] = error.errors?.pic.message) : ""
        res.render("admin/testimonial/create", { errorMessage: errorMessage, data: data })
    }
}

async function remove(req, res) {
    try {
        const data = await Testimonial.findOne({ _id: req.params._id })
        await data.deleteOne()
        res.redirect("/admin/testimonial")
    } catch (error) {
        console.log(error)
        res.redirect("/admin/testimonial")
    }
}
module.exports = { home, create, store, remove, edit, update }