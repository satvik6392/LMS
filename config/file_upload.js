const express = require('express');
const multer = require('multer');
const {fileUploadConstants} = require('./constants');

const allowedMimes = fileUploadConstants.allowedMimes;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(fileUploadConstants);
        
        cb(null, fileUploadConstants.storagePath);  // Define destination path
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;  // Create unique filename
        cb(null, uniqueSuffix);
    }
});

function fileFilter(req, file, cb) {
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);  // Accept file
    } else {
        cb(new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed.'), false);  // Reject file
    }
}

const upload = multer({ storage: storage ,fileFilter: fileFilter, limits: {
    fileSize: fileUploadConstants.fileSize  // Limit file size to 2MB
}});

// Export upload as part of an object
module.exports = { upload };
