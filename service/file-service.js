'use strict';
const ApiError = require('../exceptions/api.error');
const sharp = require('sharp');
const { File } = require('../models');

class FileService {
  async attachedFile(f, id) {
    if (typeof f !== 'undefined') {
      // const fileData = this.getFileFormat(f);
      // const format = this.verifyFileFormat(fileData);
      const file = await File.create({
        path: f.path, type: f.mimetype, commentId: id
      });

      return file;
    }
    return f = {};
  }

  getFileFormat(file) {
    const mimetypeData = file.mimetype.split('.');
    const format = mimetypeData[mimetypeData.length - 1];

    return {
      file,
      format
    };
  }

  verifyFileFormat(fileData) {
    const { file, format } = fileData;
    if (format === 'gif' || format === 'jpg' || format === 'png') {
      const image = this.verifyImgSize(file);

      return image;
    }

    if (fileData.format === 'txt') {
      const text = this.verifyFileSize(file);

      return text;
    }

    throw ApiError.BadRequest('unexpected file format');
  }

  verifyFileSize(file) {
    if (file.size <= 100000) {
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
