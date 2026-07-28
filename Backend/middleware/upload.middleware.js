import multer from "multer";
import path from "path";


// Storage
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() + path.extname(file.originalname);

        cb(null, uniqueName);

    }

});


// File Filter
const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF, JPG and PNG files are allowed"), false);
    }

};


// Upload
const upload = multer({
    storage,
    fileFilter
});

export default upload;