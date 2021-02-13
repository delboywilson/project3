// B step 1 set up template engine
const express = require('express')
const morgan = require('morgan')
const db = require('./data.js')
const database = require('./database')
const path = require('path')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.use(morgan('dev'))
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// B step 3
app.get('/', (req, res) => {
  const welcome = "Welcome to our schedule website"
  res.render('pages/index', {
    welcome: welcome
  })
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

// step 3a
app.get('/users/:singleUser', (req, res) => {
  
  const userId = req.params.singleUser
  const userIdSingle = db.users[userId]

  res.render('pages/singleuser', {
    userIdSingle: userIdSingle
  })
})

// B step 3
app.get('/users/:singleUser/schedules', (req, res) => {
  
  const userId = req.params.singleUser
  const scheduleId = []
  // const scheduleIdSingle = db.schedules[userId]

  for (i=0; i < db.schedules.length; i ++) {
    if (db.schedules[i]['user_id'] == userId)
    scheduleId.push(db.schedules[i])
  }
  console.log(scheduleId)
  res.render('pages/singleschedule', {
    scheduleId: scheduleId
  })
})

// step 4a
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

app.post('/schedules', (req, res) => {
  let newSchedule = {
    'user_id': Number(req.body.user_id),
    'day': Number(req.body.day),
    'start_at': req.body.start_at,
    'end_at': req.body.end_at
  }
  console.log(newSchedule)
  db.schedules.push(newSchedule)
  console.log(db.schedules)
  return res.send("New schedule added")
})

// step 4b
app.post('/users', (req, res) => {
  const hash = crypto.createHash('sha256').update(req.body.password).digest('hex')
  let newUser = {
    'firstname': req.body.firstname,
    'lastname': req.body.lastname,
    'email': req.body.email,
    'password': hash
  }
  console.log(newUser)
  db.users.push(newUser)
  console.log(db.users)
  return res.send("New user added")
})

// end of file
app.listen(PORT, () => {
  console.log(`server is listening on localhost${PORT}`)
})