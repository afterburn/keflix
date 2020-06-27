const path = require('path')
const createProcess = require('create-process')

createProcess({
  cmd: 'npm',
  args: ['run', 'build-hot'],
  opts: {
    cwd: path.join(__dirname, '..')
  }
})

createProcess({
  cmd: 'npm',
  args: ['run', 'serve-hot'],
  opts: {
    cwd: path.join(__dirname, '..')
  }
})