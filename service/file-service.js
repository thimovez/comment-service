'use strict';
const ApiError = require('../exceptions/api.error');
const sharp = require('sharp');
const { File } = require('../models');

class FileService {
  async attachedFile(f, id) {
    if (typeof f !== 'undefined') {
      const fileType = this.identifyFileType(f);
      const file = await File.create({
        path: f.path, type: fileType, commentId: id
      });

      return file;
    }

    return f = {};
  }

  identifyFileType(f) {
    const type = f.mimetype;
    if (type === 'image/gif' || type === 'image/jpg' || type === 'image/png') {
      this.verifyImgSize(f);

      return type;
    }

    if (type === 'text/plain') {
      this.verifyFileSize(f);

      return type;
    }

    throw ApiError('unsupported type');
  }

  verifyFileSize(file) {
    if (file.size === 0) {
      throw ApiError.BadRequest('file can not be empty');
    }

    if (file.size > 100000) {
      throw ApiError.BadRequest('file size is so big');
    }

    return file;
  }

  async verifyImgSize(file) {
    const metadata = await sharp(file.path).metadata();
    if (metadata.width > 320 || metadata.height > 240) {
      await sharp(file.path)
        .resize(320, 240, {
          fit: 'contain'
        })
        .toFile(`./uploads/${file.encoding}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
    }

    return file;
  }
}

module.exports = new FileService();
