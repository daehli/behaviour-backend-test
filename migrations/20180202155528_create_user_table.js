exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('account', function(t) {
      t.increments('id').primary()
    }),
    knex.schema.createTableIfNotExists('characters', function(table) {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.integer('xp')
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('account'), knex.schema.dropTable('character')])
}
