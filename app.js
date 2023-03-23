require('dotenv').config()
const express = require('express')

const app = express()

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

// middlewares

app.use(express.json())

app.use('/', authRoutes)
app.use('/user', userRoutes)

// error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})
app.listen(process.env.PORT || 5000, () => {
    console.log('server is running', process.env.PORT || 5000)
})

process.on('SIGINT', async () => {
    process.exit(1)
})