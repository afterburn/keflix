module.exports = async({ query, Errors }, req, res) => {
  try {
    if (!req.params.slug) {
      throw new Error(Errors.InternalServerError)
    }
    
    const result = await query(`SELECT * FROM movies m INNER JOIN movie_versions v ON m.id = v.movie_id WHERE slug = '${req.params.slug}'`)
    if (result.length === 0) {
      throw new Error(Errors.SomethingWentWrong)
    }

    const payload = {...result[0]}
    delete payload.path
    delete payload.movie_id

    res.status(200).json({ payload })
  } catch (ex) {
    res.status(200).json({ errors: [ex] })
  }
}