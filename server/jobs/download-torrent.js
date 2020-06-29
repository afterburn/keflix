const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')
const WebTorrent = require('webtorrent')
const { downloadFile } = require('../helpers/download-helper')

module.exports = (torrentUrl, folderPath) => {
  const process = {
    events: {},
    on: function (namespace, callback) {
      if (!this.events.hasOwnProperty(namespace)) {
        this.events[namespace] = []
      }
      this.events[namespace].push(callback)
    },
    emit: function () {
      const args = Array.from(arguments)
      const namespace = args.shift()
      if (this.events.hasOwnProperty(namespace)) {
        this.events[namespace].forEach(cb => cb(...args))
      }
    }
  }

  const createFolder = () => {
    return mkdirp(folderPath)
  }

  const handleProgress = (torrent) => {
    process.emit('progress', torrent)
  }

  const downloadTorrent = (torrentFile, destination) => {
    return new Promise((resolve, reject) => {
      console.log('downloading torrent:', torrentFile)
      const client = new WebTorrent()
      client.add(torrentFile, { path: destination }, (torrent) => {
        console.log('torrentInfo received')
        process.emit('start', torrent)
        const progressInterval = setInterval(() => handleProgress(torrent), 500)
        handleProgress(torrent)

        torrent.on('done', () => {
          resolve(torrent)
          clearInterval(progressInterval)
        })
        torrent.on('error', (err) => {
          process.emit('error', err)
          reject(err)
        })
      })
    })
  }

  const moveMp4File = (torrent, folderPath) => {
    return new Promise((resolve, reject) => {
      const mp4 = torrent.files.find(file => file.name.endsWith('.mp4'))
      torrent.destroy()
      fs.rename(path.join(folderPath, mp4.path), path.join(folderPath, 'video.mp4'), (err) => {
        if (err) reject(err)
        else resolve()
      })
    })
  }

  const getFiles = (folderPath) => {
    return new Promise((resolve, reject) => {
      fs.readdir(folderPath, (err, files) => {
        if (err) {
          return reject(err)
        } 
        resolve(files)
      })
    })
  }

  const removeFile = (filePath) => {
    return new Promise((resolve, reject) => {
      fs.stat(filePath, (err, stats) => {
        if (err) {
          return reject(err)
        }
        if (stats.isDirectory()) {
          rimraf(filePath, (err) => {
            if (err) {
              return reject(err)
            }
            resolve()
          })
        } else {
          fs.unlink(filePath, (err) => {
            if (err) {
              return reject(err)
            }
            resolve()
          })
        }
      })
    })
  }

  const run = async () => {
    try {
      console.log('creating folder')
      await createFolder(folderPath)
      let torrent
      if (torrentUrl.startsWith('http')) {
        console.log('torrent is url')
        const torrentPath = path.join(folderPath, 'tmp')
        await downloadFile(torrentUrl, torrentPath, '.torrent')
        console.log('torrent file downloaded')
        torrent = await downloadTorrent(torrentPath + '.torrent', folderPath)
      } else {
        console.log('torrent is file')
        torrent = await downloadTorrent(torrentUrl, folderPath)
      }

      const mp4 = torrent.files.find(file => file.name.endsWith('.mp4'))
      const moviePath = path.join(folderPath, mp4.path)
      torrent.destroy()
      process.emit('done', moviePath)
      await removeFile(path.join(folderPath, 'tmp.torrent'))
      console.log('done')
    } catch(ex) {
      console.log(ex)
    }
  }

  run()

  return process
}
