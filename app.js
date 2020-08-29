const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

//hbs setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

//登入session模組
app.use(session({
  secret: 'ThisIsExpenseSecret',
  resave: false,
  saveUninitialized: true
}))
//method-override
app.use(methodOverride('_method'))

// route setting
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
