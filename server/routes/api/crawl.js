const request = require('request')
const { JSDOM } = require('jsdom')

const stringToSlug = require('../../helpers/string-to-slug')

module.exports = (context, req, res) => {
  const url = req.query.url
  request(url, (err, response, body) => {
    if (err) {
      console.log(err)
      res.status(200).json({
        errors: [Errors.InternalServerError]
      })
      return
    }

    const dom = new JSDOM(body, { includeNodeLocations: true })
    const movieInfo = dom.window.document.querySelector('#movie-info')

    const title = movieInfo.children[0].children[0].innerHTML
    const year = Number(movieInfo.children[0].children[1].innerHTML)
    const slug = stringToSlug(`${title} ${year}`)
    const genres = movieInfo.children[0].children[2].innerHTML.split('/').map(genre => genre.trim().toLowerCase())
    const description = dom.window.document.querySelector('#synopsis').children[2].innerHTML.trim()
    const cover = dom.window.document.querySelector('#movie-poster img').getAttribute('data-cfsrc')
    const versions = Array.from(movieInfo.children[1].children)
      .filter(el => el.tagName === 'A' && el.innerHTML.indexOf('Subtitles') === -1)
      .map(el => {
        return {
          type: el.innerHTML,
          url: el.getAttribute('href')
        }
      })

    const result = {
      title,
      description,
      year,
      slug,
      genres,
      cover,
      versions
    }

    res.status(200).json({
      payload: result
    })
  })
}