//dependances
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
//midlleware
const { errorHandler } = require('./middleware/errorMiddleware')

// initialisation
const connectDB = require('./config/db')
const PORT = process.env.PORT

//connect to database
connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.status(200).send("Bienvenue sur l'api de krysto")
})

//Routes

app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
