const fs = require('fs')
const request = require('request')

const extensions = {
  'image/jpeg': '.jpg'
}

module.exports.downloadFile = (url, filePath, extension) => {
  return new Promise((resolve, reject) => {
    request.head(url, (err, res, body) => {
      if (err) {
        return reject(err)
      }

      
      const bytes = res.headers['content-length']
      const mimeType = res.headers['content-type']
      const ext = extension || extensions[mimeType]
      const writeStream = fs.createWriteStream(filePath + ext)

      request(url)
        .pipe(writeStream)
        .on('close', resolve)
    })
  })
}