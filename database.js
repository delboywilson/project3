const pgp = require('pg-promise')()

const connection = 'postgress://Delboy@localhost:5432/mr_coffee'

const db = pgp(connection)

module.exports = db
