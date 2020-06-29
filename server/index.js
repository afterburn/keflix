const path = require('path')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mysql = require('mysql')
const protect = require('./middleware/protect')
const routes = require('./routes')
const Errors = require('./errors')
const WebSocket = require('ws')
const downloadTorrent = require('./jobs/download-torrent')
const prettyBytes = require('pretty-bytes')
const crypto = require('crypto')

const wss = new WebSocket.Server({ noServer: true })

const jobs = []

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('received: %s', message)
  })

  ws.send(JSON.stringify({
    type: 'UPDATE_JOBS',
    payload: jobs
  }))

  setInterval(() => {
    ws.send(JSON.stringify({
      type: 'UPDATE_JOBS',
      payload: jobs
    }))
  }, 500)
})

const connection = mysql.createConnection({
  host: '192.168.178.34',
  user: 'admin',
  password: 'Prolo757137',
  database: 'keflix'
})

function query(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) {
        return reject(err)
      }
      if (Array.isArray(result)) {
        resolve([...result].map(rowPacket => ({...rowPacket})))
      } else {
        resolve([{...result}])
      }
    })
  })
}

connection.connect((err) => {
  if (err) {
    console.log(err)
  }
})

const app = express()

const server = http.createServer(app)

server.on('upgrade', (req, socket, head) => {
	wss.handleUpgrade(req, socket, head, (ws) => {
		wss.emit('connection', ws, req)
	})
})


app.use(bodyParser.json({}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))
app.use('/avatars', express.static(path.join(__dirname, 'data', 'avatars')))
app.use('/covers', express.static(path.join(__dirname, 'data', 'covers')))


const scheduleDownload = async ({ slug, movieId, type, url }) => {
  const folderPath = path.join(__dirname, 'data', 'movies', slug, type)
  const process = downloadTorrent(url, folderPath)
  let pid = 0
  process.on('start', (torrent) => {
    console.log('download started')
    jobs.push({
      id: pid,
      name: slug,
      downloadSpeed: torrent.downloadSpeed,
      downloaded: torrent.downloaded,
      total: torrent.length
    })
  })

  process.on('progress', (torrent) => {
    const job = jobs.find(job => job.id === pid)
    job.total = torrent.length
    job.downloaded = torrent.downloaded
    job.downloadSpeed = torrent.downloadSpeed
  })

  process.on('done', async (moviePath) => {

    const p = moviePath.replace(__dirname, '').replace(/\\/gim, '\\\\')
    const hash = crypto.createHash('md5').update(p).digest('hex')
    const result = await query(`INSERT INTO movie_versions (movie_id, version, path, hash) VALUES(${movieId}, '${type}', '${p}', '${hash}')`)

    const index = jobs.findIndex(job => job.id === pid)
    jobs.splice(index, 1)
  })
}

const context = {
  query,
  Errors,
  scheduleDownload
}

app.post('/api/login', (req, res) => routes.api.login(context, req, res))
app.post('/api/movies/enqueue/', (req, res) => routes.api.enqueue(context, req, res))
app.get('/api/me', protect, (req, res) => routes.api.me(context, req, res))
app.get('/api/movies', (req, res) => routes.api.movies(context, req, res))
app.get('/api/crawl', (req, res) => routes.api.crawl(context, req, res))
app.get('/api/stream/:hash', (req, res) => routes.api.stream(context, req, res))
app.get('/api/stream-info/:slug', (req, res) => routes.api.streamInfo(context, req, res))

app.get('*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'))
})

server.listen(3000, () => {
  console.log('keflix.net listening on http://localhost:3000')
})
