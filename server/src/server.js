const http = require('http')

require('dotenv').config()

const app = require('./app') // separo la logica de express de la del server
const { mongoConnect } = require('./services/mongo')
const { loadPlanetsData } = require('./models/planets.model')
const { loadLaunchesData } = require('./models/launches.model')

const PORT = process.env.PORT || 8000
const server = http.createServer(app) 

async function startServer() { // cargar info antes de que el server empiece a escuchar peticiones
    await mongoConnect()
    await loadPlanetsData() // se resuelve cuando termina de cargar la data de los planetas
    await loadLaunchesData() // carga la info de los lanzamientos de spaceX
    
    server.listen(PORT, () => { // ahora si el server escucha peticiones
        console.log(`Listening on port ${PORT}...`)
    })
}

startServer()