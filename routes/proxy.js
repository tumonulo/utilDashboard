const { Router } = require('express')
const router = Router()


router.get('/games', (req, res) => {

})

router.get('/games/list', gamesList)

router.get('/games/:game', gamesGame)


module.exports = router