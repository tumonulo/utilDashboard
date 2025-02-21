const { Router } = require('express')
const router = Router()

const data = require('../controllers/discord/discordData.js')
const dataEdit = require('../controllers/discord/discordDataEdit.js')
const guilds = require('../controllers/discord/discordGuilds.js')
const guildData = require('../controllers/discord/discordGuildData.js')


router.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/html/discord.html')
})

router.get('/data', data)

router.patch('/data/edit', dataEdit)

router.get('/guilds', guilds)
 

router.get('/:guildID', (req, res) => {
    res.sendFile(process.cwd() + '/public/html/discordGuild.html')
})

router.get('/:guildID/data', guildData)


router.get('/:guildID/:channelID', (req, res) => {
    res.sendFile(process.cwd() + '/public/html/discordGuildChannel.html')
})

router.get('/:guildID/:channelID/data', guildData)


 

module.exports = router