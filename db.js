const knex = require('knex')
const environment = 'development'
const config = require('./knexfile')

exports.db = knex(config[environment])

exports.TABLES = {
  ACCOUNT: 'account',
  CHARACTER: 'character'
}
