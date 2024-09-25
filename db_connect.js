const mongoose = require("mongoose")

// mongoose.connect("mongodb://127.0.0.1:27017/cental")
// .then(() => {
//     console.log("Database is Connected")
// })
// .catch((error) => {
//     console.log(error)
// })

async function getConnect() {
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/cental")
        console.log("Database is Connected")
    } catch (error) {
        console.log(error)
    }
}

getConnect()