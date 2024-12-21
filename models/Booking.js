const mongoose = require("mongoose")

const BookingSchema = mongoose.Schema({
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
    car: {
        type: String,
        required: [true, "Car Name Field is Mendatory"]
    },
    pickup: {
        type: String,
        required: [true, "Pickup Location Field is Mendatory"]
    },
   drop: {
        type: String,
        required: [true, "Drop Location Field is Mendatory"]
    },
    pickupDate: {
        type: String,
        required: [true, "Pickup Date Field is Mendatory"]
    },
    date: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true
    }
})
const Booking = new mongoose.model("Booking", BookingSchema)

module.exports = Booking