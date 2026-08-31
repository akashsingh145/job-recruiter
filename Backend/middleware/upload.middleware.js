

import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// ES Modules mein __dirname set karne ka tarika
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload folder ka absolute path banayein (backend root mein)
const uploadDir = path.join(__dirname, "../uploads");

// Agar uploads folder nahi hai, toh automatically bana do
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ab yahan absolute path use kar rahe hain
        cb(null, uploadDir); 
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
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