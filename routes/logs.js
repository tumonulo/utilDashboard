const { Router } = require('express')
const router = Router()

const logs = require('../controllers/logs/logs.js')
const logsLog = require('../controllers/logs/logsLog.js')

router.get('/', logs)

router.get('/log/:type', logsLog)


module.exports = router