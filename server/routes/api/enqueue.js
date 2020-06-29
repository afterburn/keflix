const path = require('path')
const {downloadFile} = require('../../helpers/download-helper')

module.exports = async ({ query, scheduleDownload, Errors }, req, res) => {
  try {
    const { title, description, year, slug, genres, versions, cover } = req.body

    // Download cover image.
    await downloadFile(cover, path.join(__dirname, '..', '..', 'data', 'covers', slug))

    // Create movie record.
    let result = await query(`INSERT INTO movies (title, description, slug, year) VALUES('${title}', "${description.replace(/"/gim, `'`)}", '${slug}', ${year})`)
    const movieId = result[0].insertId

    // Get genres.
    result = await query(`SELECT id FROM genres WHERE name IN (${genres.map(genre => `'${genre}'`).join(',')})`)
    const genreIds = result.map(r => `(${movieId}, ${r.id})`).join(', ')

    // Create genre records.
    result = await query(`INSERT INTO movie_genre_relations (movie_id, genre_id) VALUES ${genreIds}`)

    // Schedule downlaod.
    versions.forEach(version => scheduleDownload({
      ...version,
      movieId,
      slug,
      type: version.type.replace('.', '-').toLowerCase()
    }))

    res.status(200).json({
      payload: null
    })
  } catch(ex) {
    console.log(ex)
    res.status(200).json({
      errors: [Errors.InternalServerError]
    })
  }
}