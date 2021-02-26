require("dotenv").config()
const cors = require('cors')
const express = require('express')
const userRoutes = require('./routes/users')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { authChecker } = require('./middlewares/authChecker')
const chatRoutes = require("./routes/chat")
const app = express()
const port = process.env.PORT
let server = app.listen(port, () => {
  console.log(`App Running at http://localhost:${port}`)
})

const chatSocket = require("./socket").chatSocket(server)

app.use(cors())
// Will Check to see if the data provided matches the Content-Type header
app.use(bodyParser.urlencoded({ extended: "false" }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(authChecker)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/users/', userRoutes)
app.use('/chats/', chatRoutes)


