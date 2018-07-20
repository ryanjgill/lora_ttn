'use strict'
let ttn = require('ttn')
let chalk = require('chalk')
let config = require('./config')
let appID = config.appID
let accessKey = config.accessKey
let r = require('rethinkdbdash')({
  db: 'ttn'
})
let saveUplink = require('./utils/saveUplink')
let log = console.log

// discover handler and open mqtt connection
ttn.data(appID, accessKey)
  .then(function (client) {
    log(chalk.gray(`Connected to ${client.appID}, awaiting events...`))

    client.on("uplink", function (devID, payload) {
      log(chalk.gray("Received uplink from ", devID))
      saveUplink(payload, r) 
    })
  })
  .catch(function (error) {
    log(chalk.red(`ERROR: ${error}`))
    process.exit(1)
  })

