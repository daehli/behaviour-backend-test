'use strict'
var knex = require('knex')(require('./knexfile'))
var cascadeDelete = require('bookshelf-cascade-delete')
var bookshelf = require('bookshelf')(knex)
bookshelf.plugin(cascadeDelete)
module.exports = bookshelf
