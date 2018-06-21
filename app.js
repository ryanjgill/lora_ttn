let ttn = require('ttn')
let config = require('./config')
let appID = config.appID
let accessKey = config.accessKey

ttn.data(appID, accessKey)
  .then(function (client) {
    client.on("uplink", function (devID, payload) {
      console.log("Received uplink from ", devID)
      console.log(payload)

      // send downlink
      client.send("airbnb", new Buffer([ 0x0f, 0xaf ]))
    })
  })
  .catch(function (error) {
    console.error("Error", error)
    process.exit(1)
  })