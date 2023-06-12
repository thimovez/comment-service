const ApiError = require('../exceptions/api.error');
const multer  = require('multer');
const path = require('node:path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (ext === '.png' || ext === '.jpg' || ext === '.gif' || ext === '.txt') {
      return callback(null, true);
    }

    callback(ApiError('Unexpected file format'), false);
  }
}).single('file');

module.exports = upload;
