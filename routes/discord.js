const { Router } = require('express')
const router = Router()

const data = require('../controllers/discord/discordData.js')
const dataEdit = require('../controllers/discord/discordDataEdit.js')
const clientData = require('../controllers/discord/discordClientData.js')
const guildData = require('../controllers/discord/discordGuildData.js')
const guildChannelData = require('../controllers/discord/discordGuildChannelData.js')


router.get('/data', data)

router.patch('/data/edit', dataEdit)

router.get('/client/data', clientData)
 
router.get('/:guildID/data', guildData)

router.get('/:guildID/:channelID/data', guildChannelData)

router.get(/^\/(\d+)?(\/\d+)?$/, (req, res) => {
    res.sendFile(process.cwd() + '/public/html/discord.html')
})

module.exports = router