exports.up = function(knex, Promise) {
  //account_character
  return Promise.all([
    knex.schema.createTableIfNotExists('account_characters', function(table) {
      table
        .increments('id')
        .unsigned()
        .primary()
      table
        .integer('account_id')
        .unsigned()
        .references('id')
        .inTable('account')
      table
        .integer('character_id')
        .unsigned()
        .references('id')
        .inTable('characters')
    })
  ])
}

exports.down = function(knex, Promise) {
  Promise.all([
    knex.schema.dropTable('characters'),
    knex.schema.dropTable('account'),
    knex.schema.dropTable('account_character')
  ])
}
