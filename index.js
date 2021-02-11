// step 1 - set up
const express = require('express')
const db = require ('./data.js')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000

// step 2 
app.get('/', (req, res) => {
  res.send('Welcome to our schedule website')
})

app.get('/users', (req, res) => {
  res.json(db.users)
})

app.get('/schedules', (req, res) => {
  res.json(db.schedules)
})

// step 3a

app.get('/users/:singleUser', (req, res) => {
  
  const userId = req.params.singleUser

  console.log(req.params)
  res.json(db.users[userId])
})

// step 3b

app.get('/users/:singleUser/schedules', (req, res) => {
  
  const userId = req.params.singleUser
  const scheduleId = []

  for (i=0; i < db.schedules.length; i ++) {
    if (db.schedules[i]['user_id'] == userId)
    scheduleId.push(db.schedules[i])
  }
  return res.send(scheduleId)
})


// step 4a

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/schedules', (req, res) => {
  let newSchedule = req.body
  console.log(newSchedule)
  db.schedules.push(newSchedule)
  res.send("New schedule added")
})

// app.post('/schedules', (req, res) => {
//   let newSchedule = req.body
//   let newObject = {newSchedule}
//   console.log(newObject)
//   db.schedules.push(newObject)
//   res.send("New schedule added")
// })




//step 4b


app.post('/users', (req, res) => {
  let newUser = req.body
  console.log(newUser)
  db.users.push(newUser)
  res.send("New user added")
})




app.listen(PORT, () => {
  console.log(`server is listening on localhost${PORT}`)
})