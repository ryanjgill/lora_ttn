let moment = require('moment')
let chalk = require('chalk')

let log = console.log

moment().format('LTS')
module.exports = (payload, r) => {
  r.table('uplinks')
    .insert(payload)
    .run()
    .then(results => log(chalk.green(`Uplink saved.`), chalk.blue(moment().format('LTS'))))
    .catch(err => log(chalk.red(err)))
}