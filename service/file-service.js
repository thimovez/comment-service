'use strict';
const fs = require('node:fs');
const sharp = require('sharp');
const ApiError = require('../exceptions/api.error');
const { File } = require('../models');

class FileService {
  async attachedFile(f, id) {
    if (typeof f !== 'undefined') {
      const buffer = this.identifyFileType(f);
      const file = await File.create({
        path: f.path, type: f.mimetype, buffer, commentId: id
      });

      return file;
    }

    return f = {};
  }

  identifyFileType(f) {
    const type = f.mimetype;
    if (type === 'image/gif' || type === 'image/jpeg' || type === 'image/png') {
      const buffer = this.verifyImgSize(f);

      return buffer;
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

  async verifyImgSize(f) {
    const metadata = await sharp(f.path).metadata();
    if (metadata.width > 320 || metadata.height > 240) {
      const buffer = await sharp(f.path)
        .resize(320, 240, {
          fit: 'contain'
        })
        .toBuffer();
      fs.unlinkSync(f.path);
      return buffer;
    }

    return f.buffer;
  }
}

module.exports = new FileService();
