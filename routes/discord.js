const { Router } = require('express')
const router = Router()

const clients = require('../controllers/discord/discordClients.js')
const clientsEdit = require('../controllers/discord/discordClientsEdit.js')
const guilds = require('../controllers/discord/discordGuilds.js')
const guildData = require('../controllers/discord/discordGuildData.js')


router.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/html/discord.html')
})

router.get('/clients', clients)

router.patch('/clients/edit', clientEdit)

router.get('/guilds', guilds)

router.get('/:guildID/data', guildData)


module.exports = router