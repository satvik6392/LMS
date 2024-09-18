/* Constant data for storage for file uplaoding : book images */

const fileUploadConstants = {
    'storagePath' : './storage/books-images',
    'fileSize': 2 * 1024 * 1024,
    'allowedMimes': ['image/jpeg', 'image/jpg', 'image/png']
};

module.exports = {
    fileUploadConstants
}