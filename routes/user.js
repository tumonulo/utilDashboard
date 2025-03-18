const { Router } = require('express')
const router = Router()

const register = require('../controllers/user/register.js')
const login = require('../controllers/user/login.js')



router.post('/register', register)

router.post('/login', login)


module.exports = router