const multer = require('multer')

function makeUploader(folderName) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `public/uploads/${folderName}`)
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname)
        }
    })
    const upload = multer({ storage: storage })
    return upload
}
module.exports = {
    usersUploader: makeUploader("users"),
    carsUploader: makeUploader("cars"),
    testimonialsUploader: makeUploader("testimonials"),
}