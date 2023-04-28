'use strict';
const ApiError = require('../exceptions/api.error');
const sharp = require('sharp');
const { File } = require('../models');

class FileService {
  async attachedFile(f, id) {
    if (typeof f !== 'undefined') {
      // console.log(f);
      // const fileType = this.identifyFileType(f);
      const file = await File.create({
        path: f.path, type: f.mimetype, commentId: id
      });

      return file;
    }

    return f = {};
  }

  identifyFileType(f) {
    const type = f.mimetype;
    if (type === 'image/gif' || type === 'image/jpeg' || type === 'image/png') {
      // this.verifyImgSize1(f);

      return type;
    }

    if (type === 'text/plain') {
      this.verifyFileSize(f);

      return type;
    }

    throw ApiError('unsupported type');
  }

  verifyFileSize(f) {
    if (f.size === 0) {
      throw ApiError.BadRequest('file can not be empty');
    }

    if (f.size > 100000) {
      throw ApiError.BadRequest('file size is so big');
    }

    return f;
  }

  async verifyImgSize1(f) {
    const metadata = await sharp(f.path).metadata();
    if (metadata.width > 320 || metadata.height > 240) {
      await sharp(f.path)
        .resize(320, 240, {
          fit: 'contain'
        })
        .toFile('./public/uploads/')
        .then(data => data);
    }

    return f;
  }

  async verifyImgSize(f) {
    const metadata = await sharp(f.path).metadata();
    if (metadata.width > 320 || metadata.height > 240) {
      await sharp(f.path)
        .resize(320, 240, {
          fit: 'contain'
        })
        .toFile(f.filename, err => {
          if (err) {
            throw ApiError(err);
          }
        });
    }

    return f;
  }
}

module.exports = new FileService();
