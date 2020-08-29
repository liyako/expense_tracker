//資料庫
const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const moment = require("moment");

router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ date: "desc" }) // desc
    .then(records => {
      let totalAmount = 0
      if (records.length !== 0) {
        totalAmount = records.map(records => records.amount).reduce((a, b) => a + b)
      }
    res.render('index', { records,totalAmount})
    })
    .catch(error => console.error(error))
})

module.exports = router
