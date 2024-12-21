const mongoose = require("mongoose")

const ContactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Field is Mendatory"]
    },
    email: {
        type: String,
        required: [true, "Email Field is Mendatory"]
    },
    phone: {
        type: Number,
        required: [true, "Phone Field is Mendatory"]
    },
    subject: {
        type: String,
        required: [true, "Subject Field is Mendatory"]
    },
    message: {
        type: String,
        required: [true, "Message Field is Mendatory"]
    },
    date: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true
    }
})
const Contact = new mongoose.model("Contact", ContactSchema)

module.exports = Contact