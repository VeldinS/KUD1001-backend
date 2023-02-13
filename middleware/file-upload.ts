import multer from 'multer';
const randomId = require('./randomIdGenerator')

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const fileUpload = multer({
    // @ts-ignore
    limits: 500000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/images');
        },
        filename: (req, file, cb) => {
            // @ts-ignore
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, randomId + '.' + ext);
        }
    }),
    fileFilter: (req, file, cb) => {
        // @ts-ignore
        const isValid = !!MIME_TYPE_MAP[file.mimetype];
        let error = isValid ? null : new Error('Invalid mime type!');
        // @ts-ignore
        cb(error, isValid);
    }
});

module.exports = fileUpload;
