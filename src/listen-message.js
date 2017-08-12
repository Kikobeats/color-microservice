'use strict'

const boxen = require('boxen')
const chalk = require('chalk')
const ip = require('ip')

const externalIp = ip.address()

const DEFAULT_BOXEN_OPTS = {
  padding: 1,
  borderColor: 'green',
  margin: 1
}

module.exports = opts => {
  const { appName, port } = opts
  const boxenOpts = Object.assign({}, DEFAULT_BOXEN_OPTS, opts.boxenOpts)

  let message = chalk.green(`${appName} is running!\n\n`)
  const localUrl = `http://localhost:${port}`
  const remoteUrl = `http://${externalIp}:${port}`

  message += `• ${chalk.bold('Local:           ')} ${localUrl}\n`
  message += `• ${chalk.bold('On Your Network: ')} ${remoteUrl}`
  return boxen(message, boxenOpts)
}
