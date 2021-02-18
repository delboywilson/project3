const express = require('express')
const morgan = require('morgan')
const db = require('./data.js')
const database = require('./database')
const path = require('path')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.use(morgan('dev'))
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressLayouts)

// comment out this '/' route so that it works for the new index for project C
// app.get('/', (req, res) => {
//   res.render('pages/index')
// })
app.get('/users', (req, res) => {
  const users = db.users
  res.render('pages/users', {
    users: users
  })
})
app.get('/schedules', (req, res) => {
  const schedules = db.schedules
  res.render('pages/schedules',{
    schedules: schedules
  })
})
app.get('/error', (req, res) => {
  console.error()
  res.render('pages/error')
})

app.get('/users/:singleUser', (req, res) => {
  const userId = req.params.singleUser
  const userIdSingle = db.users[userId]
// TODO better solution?
  if (userId == "new") {
    res.render('pages/usersnew')
  } else if (userId >= "0" && userId <= "2" ) {
    res.render('pages/singleuser', {
      userId: userId,
      userIdSingle: userIdSingle
  })
  } else (res.render('pages/error'))
})

app.get('/users/:singleUser/schedules', (req, res) => {
  const userId = req.params.singleUser
  const scheduleId = []

  for (i=0; i < db.schedules.length; i ++) {
    if (db.schedules[i]['user_id'] == userId)
    scheduleId.push(db.schedules[i])
  }
  console.log(scheduleId)
  res.render('pages/singleschedule', {
    userId: userId,
    scheduleId: scheduleId
  })
})

app.get('/schedules/new', (req, res) => res.render('pages/schedulenew'))

app.post('/schedules', (req, res) => {
  let newSchedule = {
    'user_id': req.body.user_id,
    'day': req.body.day,
    'start_at': req.body.start_at,
    'end_at': req.body.end_at
  }
  const schedules = db.schedules
  console.log(newSchedule)
  db.schedules.push(newSchedule)
  console.log(db.schedules)
  res.render('pages/schedules',{
    schedules: schedules
  })
})

app.get('/users/new', (req, res) => res.render('pages/usersnew'))

app.post('/users', (req, res) => {
  const hash = crypto.createHash('sha256').update(req.body.password).digest('hex')
  let newUser = {
    'firstname': req.body.firstname,
    'lastname': req.body.lastname,
    'email': req.body.email,
    'password': hash
  }
  const users = db.users
  console.log(newUser)
  db.users.push(newUser)
  console.log(db.users)
  res.render('pages/users', {
    users: users
  })
})

// projC step1/2

app.get('/', (req, res) => {
  database.any('SELECT * from schedule;')
    .then((schedule) => {
      console.log(schedule)
      res.render('pages/index2', {
        mySchedule: schedule
      })
    })
    .catch((err) => {
      console.error(err)
      res.render('pages/error2', {
        err: err
      })
    })
})

app.get('/new', (req, res) => {
  res.render('pages/new')
})

// projC step2

app.post('/new', (req, res) => {

  let v1 = req.body.user_name
  let v2 = req.body.day
  let v3 = req.body.start_time
  let v4 = req.body.end_time
  // let newID = database.any('SELECT user_id from schedule')

  database.none('INSERT INTO schedule(user_name, day, start_time, end_time) VALUES ($1, $2, $3, $4);', [v1, v2, v3, v4])
  .then(() => {
    // console.log(`new user added with ID: ${newID}`)
    res.render('pages/new') 
  })
  .catch((err) => {
    console.error(err)
    res.render('pages/error2', {
      err: err
    })
  })
})


app.listen(PORT, () => {
  console.log(`server is listening on localhost${PORT}`)
})

