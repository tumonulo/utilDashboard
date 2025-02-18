const { Router } = require('express')
const router = Router()

const guilds = require('../controllers/discord/discordGuilds.js')

router.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/html/index.html')
})

router.get('/guilds', guilds)

router.get('/:guild', a)

router.get('/:guild/:channel', b)


module.exports = router