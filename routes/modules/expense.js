//CRUD router
const express = require('express')
const router = express.Router()

const Expense_tracker  = require('../../models/record')


//新增頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

//新增到資料庫
router.post('/', (req, res) => {
  const { name, date,category, amount } = req.body
  const expense = new Expense_tracker({
    name,
    date,
    category,
    amount
  })
  return expense.save()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/index', (req,res) => {
  res.render('index')
})

module.exports = router
