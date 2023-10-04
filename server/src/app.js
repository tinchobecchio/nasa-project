const path = require('path')

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const api = require('./routes/api')


const app = express()

// Security
app.use(cors({
    origin: 'http://localhost:3000'
}))

// logger
app.use(morgan('combined'))

// Config
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))

// versiones de la api
app.use('/v1', api)
// app.use('/v2', v2Router) ejemplo

// Routes
app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
}) 


module.exports = app