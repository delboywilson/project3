const express = require('express')
const db = require ('./data.js')
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('Welcome to our schedule website')
})

app.get('/users', (req, res) => {
  res.json(db.users)
})

app.get('users/:0', (req, res) => {
  // console.log(req.params)
  res.send('0 is the user')
})

app.get('/schedules', (req, res) => {
  res.json(db.schedules)
})


app.listen(PORT, () => {
  console.log(`server is listening on localhost${PORT}`)
})