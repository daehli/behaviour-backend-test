'use strict'

var Character = require('./character')
var bookshelf = require('../bookshelf')
var Account = bookshelf.Model.extend(
  {
    tableName: 'account',
    characters: function() {
      return this.belongsToMany(Character)
    }
  },
  {
    dependents: ['characters']
  }
)
module.exports = Account
