'use strict';
const Router = require('express');
const path = require('path');
const commentController = require('../controllers/comment-controller');
const router = new Router();
const authMiddleware = require('../middleware/auth-middleware');
const multer  = require('multer');
const fileService = require('../service/file-service');

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
    if (ext === '.png' && ext === '.jpg' && ext === '.gif') {
      fileService.verifyImgSize(file);

      return callback(null, true);
    }

    if (ext !== '.txt') {
      fileService.verifyFileSize(file);

      return callback(null, true);
    }

    callback(new Error('Unexpected file format'), false);
  }
}).single('file');

router.post('/', authMiddleware, upload, commentController.createComment);
router.post('/sort', authMiddleware, commentController.sortParentComments);

module.exports = router;
