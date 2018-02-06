'use strict'
var express = require('express')
var Account = require('../models/account')
var Character = require('../models/character')
var router = express.Router()
var _ = require('lodash')

const validCharacterListId = async list => {
  if (_.isArray(list) || _.isNumber(_.toNumber(list))) {
    const listCharacterId = !_.isArray(list) ? [_.toNumber(list)] : list
    const arrValidID = _.filter(listCharacterId, async x => {
      const value = await Character.where('id', x).fetch()
      if (value) {
        return value
      }
    })
    return arrValidID
  }
  throw 'Account id is not a Number of a list'
}

router
  .route('/')
  .get(function(req, res) {
    Account.fetchAll({ withRelated: ['characters'] }).then(function(account) {
      res.json({ account })
    })
  })
  .post((req, res) => {
    Account.forge()
      .save()
      .then(data => {
        res.json({ error: false, data: { id: data.get('id') } })
      })
      .catch(err => {
        res.status(500).json({ error: true, data: { message: err.message } })
      })
  })

router
  .route('/:id')
  .get((req, res) => {
    Account.forge({ id: req.params.id })
      //{ withRelated: ['characters'] }
      .fetch({ withRelated: ['characters'] })
      .then(data => {
        if (!data) {
          res.status(404).json({ error: true, data: [] })
        }
        console.log(data.related('characters').toJSON())
        res.json({ error: false, data: data.toJSON() })
      })
      .catch(err => {
        res.status(500).json({ error: true, data: { message: err.message } })
      })
  })
  .delete((req, res) => {
    Account.forge({ id: req.params.id })
      .fetch()
      .then(data => {
        data
          .destroy()
          .then(() => {
            res.json({ error: false, data: { message: 'Account successfully deleted' } })
          })
          .catch(err => {
            res.status(500).json({ error: true, data: { message: err.message } })
          })
      })
      .catch(err => {
        res.status(500).json({ error: true, data: { message: err.message } })
      })
  })
  .put(async (req, res) => {
    const listCharacters = await validCharacterListId(req.body.charactersIds)
    console.log(listCharacters)
    const value = await Account.where('id', req.params.id).fetch()
    if (value) {
      listCharacters.map(async x => {
        await value.characters().attach(x)
      })
      res.json({ error: false, data: { message: 'Account successfully Update' } })
    } else {
      res.status(500).json({ error: true, data: { message: 'Wrong Id for account' } })
    }
  })
module.exports = router
