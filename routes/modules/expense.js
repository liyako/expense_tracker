//CRUD router
const express = require('express')
const router = express.Router()


//新增頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/index', (req,res) => {
  res.render('index')
})

module.exports = router
