//資料庫
const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ _id: 'asc' }) // desc
    .then(recoeds => res.render('index', { recoeds }))
    .catch(error => console.error(error))
})

module.exports = router
