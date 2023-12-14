const multer = require('multer');
const path = require("path");
const storageEngine = multer.diskStorage({
    destination: path.join(__dirname, "../public/resume"),
    filename: (req, file, cb) => {
        console.log('file', file)
        cb(null, file.originalname);
    },
});



const checkFileType = function (file, cb) {
    //Allowed file extensions
    const fileTypes = /pdf/;

    //check extension names
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb("Error: You can Only Upload PDFs!!");
    }
};

const upload = multer({
    storage: storageEngine,
    limits: { fileSize: 1000000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
});


module.exports = upload;