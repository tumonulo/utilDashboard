const fs = require('node:fs')
const path = require('node:path')
const { createServer } = require('node:http');

const { Client, GatewayIntentBits, Partials } = require('discord.js')
const mongoose = require('mongoose')
const cors = require('cors')
const colors = require('colors')

const express = require('express')
const app = express()

const server = createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:8080", "https://ts-comunity-brawl.vercel.app/"],
    methods: ["GET", "POST"],
  },
})

const { PORT, MONGODB_URL, TOKEN_DISCORD_BOT_1, TOKEN_DISCORD_BOT_2 } = require('./config.js')

process.on('unhandledRejection', async (reason, promise) => {
  console.log('Unhandled Rejection error at:', promise, 'reason', reason)
  io.emit('log', { type: 'error', message: `Unhandled Rejection error at: ${promise} reason ${reason}` })
})

process.on('uncaughtException', (err) => {
   console.log('Uncaught Expection', err)
   io.emit('log', { type: 'error', message: `Uncaught Expection ${err}` })
})

process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log('Uncaught Expection Monitor', err, origin)
  io.emit('log', { type: 'error', message: `Uncaught Expection Monitor ${err} ${origin}` })
})

const client1 = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials), Partials.Channel],
  allowedMentions: {
      parse: ["users"]
    },
})
const client2 = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials), Partials.Channel],
  allowedMentions: {
      parse: ["users"]
    },
})

mongoose.set('strictQuery', true)

app.use(express.static(path.join(__dirname, 'public')))
app.disable('x-powered-by')
app.use(express.json())
app.use(cors({
  origin: '*'
}))


const folderPath = __dirname + '/routes'
fs.readdirSync(folderPath).forEach((file) => {
  const filePath = path.join(folderPath, file)
  const route = require(filePath)
  const routeName = path.basename(file, '.js')
  const routePath = routeName === 'index' ? '/' : `/${routeName}`
  app.use(`${routePath}`, route)
})

app.use((req, res) => {
  res.status(404).sendFile(process.cwd() + '/public/html/404.html')
})

const clients = [client1, client2]
module.exports = clients

const startTime = Date.now();
Promise.all([
  server.listen(PORT),
  mongoose.connect(MONGODB_URL || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }),
  client1.login(TOKEN_DISCORD_BOT_1),
  client2.login(TOKEN_DISCORD_BOT_2)
]).then(() => {
    const elapsedTime = Date.now() - startTime;
    const elapsedTimeStr = `${elapsedTime} ms`
    io.emit('log', { type: 'info', message: `
      ╔════════════════════════════════════╗╔════════════════════════════════════╗
      ║          SERVER LISTENING          ║║        DISCORD BOT CONNECTED       ║
      ╚════════════════════════════════════╝╚════════════════════════════════════╝
      Localhost: http://localhost:${PORT}       Discord Bot Name: ${client.user.username}
      Time Until Initialize: ${elapsedTimeStr.padEnd(15)} Discord Bot ID: ${client.user.id}
      ` })

  }).catch(error => {
    io.emit('error', { type: 'info', message: `
      ╔═════════════════════════════════════╗
      ║          CONNECTION ERROR           ║
      ╚═════════════════════════════════════╝
      Details: ${error.message}
    ` })
})