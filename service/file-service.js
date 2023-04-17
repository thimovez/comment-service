const ApiError = require('../exceptions/api.error');
const sharp = require('sharp');

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

  async verifyImgSize(file) {
    const metadata = await sharp(file.path).metadata();
    if(metadata.width > 320 || metadata.height > 240) {
      await sharp(file.path)
        .resize(320, 240, {
          fit: 'contain'
        })
        .toFile(`./uploads/${file.encoding}`, (err) => {
          if(err){
            console.log(err);
          }
        })

        
    }

    return file;
  }
}

module.exports = new FileService();
