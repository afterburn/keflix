const path = require('path')
const downloadTorrent = require('../server/jobs/download-torrent')
const { downloadFile } = require('../server/helpers/download-helper')

const url = process.argv[2]

const run = async () => {
  const p = (url)
    ? downloadTorrent(url, path.join(__dirname, 'test-result'))
    : downloadTorrent(path.join(__dirname, 'test.torrent'), path.join(__dirname, 'test-result'))
  p.on('start', () => console.log('download started'))
  p.on('progress', (torrent) => console.log('progress'))
  p.on('done', () => console.log('download finished'))
  p.on('error', (err) => console.log(err))
}

run()
