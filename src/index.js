'use strict'

const colorableDominant = require('colorable-dominant')
const bodyParser = require('body-parser')
const splashy = require('splashy')()
const help = require('./help')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = (app, express) => {
  app
    .use(require('helmet')())
    .use(require('compression')())
    .use(require('cors')())
    .use(require('jsendp')())
    .use(require('express-status-monitor')())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(require('morgan')(isProduction ? 'combined' : 'dev'))
    .use(express.static('static'))
    .disable('x-powered-by')

  app.get('/', async function (req, res) {
    const { url } = req.query
    if (!url) return res.success({ data: help })

    try {
      const palette = await splashy.fromUrl(url)
      const dominant = colorableDominant(palette)
      return res.success({ data: Object.assign({}, { palette }, dominant) })
    } catch (err) {
      return res.error({ message: err.message || err })
    }
  })

  return app
}
