//CRUD router
const express = require('express')
const router = express.Router()

const Record  = require('../../models/record')



//新增頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

//新增到資料庫
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date,category, amount,merchant } = req.body
  const expense = new Record({
    name,
    date,
    category,
    amount,
    merchant,
    userId
  })
  return expense.save()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
//資料修改頁面
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      //顯示使用者使用類型
      let category = {}
      if (record.category === 'housing') {
        category.food = true
      } else if (record.category === 'transportation') {
        category.transportation = true
      } else if (record.category === 'entertainment') {
        category.entertainment = true
      } else if (record.category === 'food') {
        category.food = true
      } else if (record.category === 'other') {
        category.other = true
      }
      return res.render('edit', { record,category})
    })
    .catch(error => console.log(error))
})

//資料修改到資料庫
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date,category, amount,merchant } = req.body
  return Record.findOne({ _id, userId })
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      record.amount = merchant
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => res.render('error'))
})
//資料刪除
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
