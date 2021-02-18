// projB step 1 set up template engine
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

// projB step 3 main routes
app.get('/', (req, res) => {
  res.render('pages/index')
})
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
  res.render('pages/error')
})
// projB step 3 single user route
app.get('/users/:singleUser', (req, res) => {
  
  const userId = req.params.singleUser
  const userIdSingle = db.users[userId]

// shows new page from step 4
// TODO better solution?
  if (userId == "new") {
    res.render('pages/usersnew')
  } else if (userId >= "0" && userId <= "2" ) {
    res.render('pages/singleuser', {
      userId: userId,
      userIdSingle: userIdSingle
  })
  } 
  else (res.render('pages/error'))
})

// projB step 3 single users/schedules route
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

// projB step 4 forms for post routes

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

// projB step 4b

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

app.listen(PORT, () => {
  console.log(`server is listening on localhost${PORT}`)
})
