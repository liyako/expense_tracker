if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
  }
  
  const db = require('../../config/mongoose')
  const bcrypt = require('bcryptjs')
  const Record = require("../record")
  const User = require('../user')
  
  const SEED_USER = [{
    name: 'user1', 
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  }]
  
  const SEED_RECORD = [
    {
        id: 1,
        name: "便當",
        date: "2020-07-28",
        category: "food",
        amount: "120",
    },
    {
        id: 2,
        name: "搭捷運",
        date: "2020-06-25",
        category: "transportation",
        amount: "60",
    },
    {
        id: 3,
        name: "漫畫",
        date: "2020-05-15",
        category: "entertainment",
        amount: "110",
    },
    {
        id: 4,
        name: "吃飯",
        date: "2020-07-26",
        category: "food",
        amount: "1000",
    },
    {
        id: 5,
        name: "豬肉便當",
        date: "2020-06-11",
        category: "food",
        amount: "115",
    },
    {
        id: 6,
        name: "捐款",
        date: "2020-07-26",
        category: "other",
        amount: "10",
    },
  ]
  
  
  db.once('open', () => {
    const runSeed = (user, index) => {
      return new Promise((resolve) => {
        bcrypt.genSalt(10)
          .then(salt => bcrypt.hash(user.password, salt))
          .then(hash => {
            User.create({
              name: user.name,
              email: user.email,
              password: hash
            })
              .then(user => {
                const userId = user._id
                Promise.all(Array.from(
                  { length: 3 },
                  (_, i) => Record.create({
                    name: SEED_RECORD[i + index].name,
                    date: SEED_RECORD[i + index].date,
                    category: SEED_RECORD[i + index].category,
                    amount: SEED_RECORD[i + index].amount,
                    userId
                  })
                )).then(() => resolve())
              })
          })
      })
    }
    User.find({ $or: [{ email: SEED_USER[0].email }, { email: SEED_USER[1].email }] })
      .then((user) => {
        Promise.all([runSeed(SEED_USER[0], 0), runSeed(SEED_USER[1], 3)])
          .then(() => {
          console.log('done')
          process.exit()
          })
        
      })
  })