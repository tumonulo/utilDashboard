const { Router } = require('express')
const router = Router()

const client = require('../controllers/discord/discordClient.js')
const clientEdit = require('../controllers/discord/discordClientEdit.js')
const guilds = require('../controllers/discord/discordGuilds.js')


router.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/html/discord.html')
})

router.get('/client', client)

router.patch('/client/edit', clientEdit)

router.get('/guilds', guilds)


module.exports = router