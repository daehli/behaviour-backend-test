const express = require('express')
const Account = require('../models/account')
const Character = require('../models/character')
const router = express.Router()
const _ = require('lodash')
// get

// post
// delete

//update

// id, name, xp, accounts_id

const validAccountListId = async list => {
  if (_.isArray(list) || _.isNumber(_.toNumber(list))) {
    const listAccountsId = !_.isArray(list) ? [_.toNumber(list)] : list
    console.log(listAccountsId)
    return _.filter(listAccountsId, async x => {
      const value = await Account.where('id', x).fetch()
      if (value) {
        return value.get('id')
      }
    })
  }
  throw 'Account id is not a Number of a list'
}
router
  .route('/')
  .get((req, res) => {
    //{ withRelated: ['account'] }
    Character.fetchAll({ withRelated: ['account'] }).then(character => {
      res.json({ character })
    })
  })
  .post(async (req, res) => {
    const accountIds = await validAccountListId(req.body.accounts_id)
    Character.forge({ name: req.body.name, xp: req.body.xp })
      .save()
      .then(async data => {
        accountIds.map(async x => {
          await data.account().attach(x)
        })
        res.json({ error: false, data: { id: data.get('id') } })
      })
      .catch(err => {
        res.status(500).json({ error: true, data: { message: err.message } })
      })
  })

router
  .route('/:id')
  .get((req, res) => {
    Character.forge({ id: req.params.id })
      .fetch({ withRelated: ['account'] })
      .then(data => {
        if (!data) {
          res.status(500).json({ error: true, data: [] })
        }
        res.json({ error: false, data: data.toJSON() })
      })
      .catch(err => {
        res.status(500).json({ error: true, data: { message: err.message } })
      })
  })
  .delete((req, res) => {
    Character.forge({ id: req.params.id })
      .fetch()
      .then(data => {
        data
          .destroy()
          .then(() => {
            res.json({ error: false, data: { message: 'Character successfully deleted ' } })
          })
          .catch(err => {
            res.status(500).json({ error: true, data: { message: err.message } })
          })
      })
      .catch(err => {
        res.status(500).json({ error: true, data: { message: err.message } })
      })
  })
  .put((req, res) => {
    Character.forge({ id: req.params.id })
      .fetch()
      .then(data => {
        data
          .save(
            {
              name: req.body.name || data.name,
              xp: req.body.xp || data.xp
            },
            {
              method: 'update',
              patch: true
            }
          )
          .then(update => {
            res.json({ error: false, data: update.toJSON() })
          })
          .catch(err => {
            res.status(500).json({ error: true, data: { message: err.message } })
          })
      })
      .catch(err => {
        res.status(500).json({ error: true, data: { message: err.message } })
      })
  })
module.exports = router
