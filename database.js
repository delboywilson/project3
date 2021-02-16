const pgp = require('pg-promise')()

const connection = 'postgress://Delboy@localhost:5432/mr_coffee_app'

const datab = pgp(connection)

module.exports = datab
