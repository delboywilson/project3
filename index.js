// step 1 - set up
const express = require('express')
const db = require ('./data.js')
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

app.post('/users', (req, res) => {

})