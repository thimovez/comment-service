const ApiError = require('../exceptions/api.error');
const sizeOf = require('image-size');

class FileService {
  getFileFormat(file) {
    const mimetypeData = file.mimetype.split('/');
    const format = mimetypeData[mimetypeData.length - 1];

    return {
      file: file,
      format: format
    };
  }

  verifyFileFormat(fileData) {
    const {file, format} = fileData;
    if(format === 'gif' || format === 'jpg' || format === 'png') {
      const image = this.verifyImgSize(file);

      return image;
    }

    if(fileData.format === 'txt') {
      const text = this.verifyFileSize(file);

      return text;
    }

    throw ApiError.BadRequest('unexpected file format')
  }

  verifyFileSize(file) {
    if (file.size <= 100000) {
      throw ApiError.BadRequest('file size is so big');
    }

    return file;
  }

  verifyImgSize(file) {
    const dimensions = sizeOf(file.path);
    if(dimensions.width > 320 || dimensions.height > 240) {
      throw ApiError.BadRequest('file is too big');
    }

    return file;
  }
}

module.exports = new FileService();
