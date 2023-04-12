
class FileService {
  verifyFile(file) {
    if(file === '') {
      return ''
    }

    return file;
  }

  verifyFileFormat(file) {
    if(file === '') {
      return ''
    }

    
  }

  verifyImgFormat() {

  }

  verifyFileSize() {

  }

  verifyImgSize() {
    
  }
}

module.exports = new FileService();
