'use strict'

var Account = require('./Account')
var bookshelf = require('../bookshelf')
var Character = bookshelf.Model.extend(
  {
    tableName: 'characters',
    account: function() {
      return this.belongsToMany(Account)
    }
  },
  {
    dependents: ['account']
  }
)
module.exports = Character
