'use strict'
let ttn = require('ttn')
let config = require('./config')
let appID = config.appID
let accessKey = config.accessKey

// discover handler and open mqtt connection
ttn.data(appID, accessKey)
  .then(function (client) {
    client.on("uplink", function (devID, payload) {
      console.log("Received uplink from ", devID)
      console.log(JSON.stringify(payload, null, 2))
    })
  })
  .catch(function (error) {
    console.error("Error", error)
    process.exit(1)
  })
