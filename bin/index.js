const debug = require('debug')
const cli = require('../lib/cli').default
const access = require('../lib/index').default

if (process.argv.indexOf("--debug") > -1) {
  debug.enable('access:*')
}

cli.execute()

access(cli.getArguments())
