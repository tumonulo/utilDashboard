const { Router } = require('express')
const router = Router()

const clients = require('../controllers/discord/discordClients.js')
const clientsEdit = require('../controllers/discord/discordClientsEdit.js')
const guilds = require('../controllers/discord/discordGuilds.js')
const guildData = require('../controllers/discord/discordGuildData.js')


router.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/html/discord.html')
})

router.get('/:guildID', (req, res) => {
    res.sendFile(process.cwd() + '/public/html/discordGuild.html')
})
router.get('/:guildID/data', guildData)

router.get('/:guildID/:channelID', (req, res) => {
    res.sendFile(process.cwd() + '/public/html/discordGuildChannel.html')
})
router.get('/:guildID/:channelID/data', guildData)

router.get('/guilds', guilds)

router.get('/clients', clients)

router.patch('/clients/edit', clientsEdit)






module.exports = router