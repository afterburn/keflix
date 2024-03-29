const fs = require('fs')
const path = require('path')

module.exports = async({ query, Errors }, req, res) => {
  const result = await query(`SELECT * FROM movie_versions WHERE hash = '${req.params.hash}'`)
  const movie = result[0]

  const moviePath = path.join(__dirname, '..', '..', movie.path)
  const stat = fs.statSync(moviePath)
  const fileSize = stat.size
  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1] 
      ? parseInt(parts[1], 10)
      : fileSize-1
    const chunksize = (end-start)+1
    const file = fs.createReadStream(moviePath, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(moviePath).pipe(res)
  }
}