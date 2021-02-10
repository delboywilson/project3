const express = require('express')
const db = require ('./data.js')
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('Welcome to our schedule website')
})

app.get('/users', (req, res) => {
  res.send('users')
})

app.get('/schedules', (req, res) => {
  res.send('schedules')
})

app.listen(PORT, () => {
  console.log(`server is listening on localhost${PORT}`)
})