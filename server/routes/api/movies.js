module.exports = async (context, req, res) => {
  const { query } = context
  let filteredMovies = (req.query.query === 'all')
    ? await query(`SELECT * FROM movies`)
    : await query(`SELECT * FROM movies WHERE title LIKE '%${req.query.query}%'`)

  const versions = (req.query.query === 'all')
    ? await query(`SELECT * FROM movie_versions`)
    : await query(`SELECT * FROM movie_versions WHERE movie_id IN (${filteredMovies.map(movie => movie.id).join(',')})`)

  const versionIds = []
  versions.forEach(version => {
    if (versionIds.indexOf(version.movie_id) === -1) {
      versionIds.push(version.movie_id)
    }
  })

  filteredMovies = filteredMovies.filter(movie => {
    return versionIds.indexOf(movie.id) !== -1
  })

  if (req.query.hasOwnProperty('page') && req.query.hasOwnProperty('amount')) {
    const page = Number(req.query.page)
    const amount = Number(req.query.amount)
    const result = filteredMovies.slice(page * amount, (page * amount) + amount)
    
    return res.status(200).json({
      payload: {
        movies: result,
        pageCount: Math.ceil(filteredMovies.length / amount)
      }
    })
  }

  res.status(200).json({
    payload: {
      movies: filteredMovies
    }
  })
}