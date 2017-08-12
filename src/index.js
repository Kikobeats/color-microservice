'use strict'

const listenMessage = require('./listen-message')
const bodyParser = require('body-parser')
const express = require('express')
const splashy = require('splashy')
const help = require('./help')

const isProduction = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 3000

const app = express()
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
  const { url, paletteColors } = req.query
  if (!url) return res.success(help)

  try {
    const data = await splashy.fromUrl(url, { paletteColors })
    return res.success(data)
  } catch (err) {
    return res.error(err.message || err)
  }
})

app.listen(PORT, () =>
  console.log(
    listenMessage({
      appName: 'Predominant Colors API',
      port: PORT
    })
  )
)
