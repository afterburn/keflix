const path = require('path')
const downloadTorrent = require('../server/jobs/download-torrent')

const p = downloadTorrent(path.join(__dirname, 'test.torrent'), path.join(__dirname, 'test-result'))
p.on('start', () => console.log('download started'))
p.on('progress', (torrent) => console.log('progress'))
p.on('done', () => console.log('download finished'))