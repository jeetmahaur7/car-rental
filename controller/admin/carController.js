const Car = require("../../models/Car")

async function home(req, res) {
    try {
        const data = await Car.find().sort({ _id: -1 })
        res.render("admin/car/index", { session: req.session, title: "Admin Car Section", data: data })
    } catch (error) {
        console.log(error)
    }
}
function create(req, res) {
    res.render("admin/car/create", { session: req.session, title: "Admin Car Section", data: {}, error: {} })
}

async function store(req, res) {
    try {
        var data = new Car(req.body)
        if (req.file) {
            data.pic = req.file.path
        }
        await data.save()
        res.redirect("/admin/car")
    }
    catch (error) {
        console.log(error)
        errorMessage = {}
        error.errors?.name ? (errorMessage['name'] = error.errors?.name.message) : ""
        error.errors?.rating ? (errorMessage['rating'] = error.errors?.rating.message) : ""
        error.errors?.rent ? (errorMessage['rent'] = error.errors?.rent.message) : ""
        error.errors?.seatingCapacity ? (errorMessage['seatingCapacity'] = error.errors?.seatingCapacity.message) : ""
        error.errors?.mode ? (errorMessage['mode'] = error.errors?.mode.message) : ""
        error.errors?.fuelType ? (errorMessage['fuelType'] = error.errors?.fuelType.message) : ""
        error.errors?.pic ? (errorMessage['pic'] = error.errors?.pic.message) : ""
        res.render("admin/car/create", { errorMessage: errorMessage, data: data })
    }
}

async function edit(req, res) {
    try {
        const data = await Car.findOne({ _id: req.params._id })
        res.render("admin/car/edit", { session: req.session, title: "Admin Car Section", data: data, error: {} })
    } catch (error) {
        console.log(error)
        res.redirect("/admin/car")
    }
}

async function update(req, res) {
    try {
        var data = await Car.findOne({ _id: req.params._id })
        data.name = req.body.name
        data.rating = req.body.rating
        data.rent = req.body.rent
        data.seatingCapacity = req.body.seatingCapacity
        data.mode = req.body.mode
        data.fuelType = req.body.fuelType
        data.active = req.body.active
        if (req.file) {
            try {
                const fs = require("fs")
                fs.unlinkSync(data.pic)
            } catch (error) { }
            data.pic = req.file.path
        }
        await data.save()
        res.redirect("/admin/car")
    } catch (error) {
        error.errors?.name ? (errorMessage['name'] = error.errors?.name.message) : ""
        error.errors?.rating ? (errorMessage['rating'] = error.errors?.rating.message) : ""
        error.errors?.rent ? (errorMessage['rent'] = error.errors?.rent.message) : ""
        error.errors?.seatingCapacity ? (errorMessage['seatingCapacity'] = error.errors?.seatingCapacity.message) : ""
        error.errors?.mode ? (errorMessage['mode'] = error.errors?.mode.message) : ""
        error.errors?.fuelType ? (errorMessage['fuelType'] = error.errors?.fuelType.message) : ""
        error.errors?.pic ? (errorMessage['pic'] = error.errors?.pic.message) : ""
        res.render("admin/car/create", { errorMessage: errorMessage, data: data })
    }
}

async function remove(req, res) {
    try {
        const data = await Car.findOne({ _id: req.params._id })
        await data.deleteOne()
        res.redirect("/admin/car")
    } catch (error) {
        console.log(error)
        res.redirect("/admin/car")
    }
}
module.exports = { home, create, store, remove, edit, update }