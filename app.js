const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const usePassport = require('./config/passport')

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT 

//hbs setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

// 啟用靜態資源
app.use(express.static('public'))

//登入session模組
app.use(session({
  secret: 'ThisIsExpenseSecret',
  resave: false,
  saveUninitialized: true
}))
//method-override
app.use(methodOverride('_method'))

// 呼叫 Passport 函式並傳入 app
usePassport(app)

//flash提示窗
app.use(flash())  // 掛載套件
//middleware
app.use((req,res,next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})
//middleware
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

// route setting
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
