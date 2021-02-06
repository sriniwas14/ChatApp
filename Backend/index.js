require("dotenv").config()
const express = require('express')
const userRoutes = require('./routes/users')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { authChecker } = require('./middlewares/authChecker')


const app = express()
const port = process.env.PORT

// Will Check to see if the data provided matches the Content-Type header
app.use(bodyParser.urlencoded({ extended: "false" }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(authChecker)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/users/', userRoutes)

app.listen(port, () => {
  console.log(`App Running at http://localhost:${port}`)
})
