const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

//login
router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  }))
//register
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊表單
router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    User.findOne({ email }).then(user => {
      if (user) {
        res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        return User.create({
          name,
          email,
          password
        })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })
  })

  //logout
  router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/users/login')
  })

module.exports = router