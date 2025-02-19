const Schema = require('../../schemas/logsSchema.js')

module.exports = async function logsLog(req, res) {
    const { message, type } = req.body

    if (!message) return res.status(400).json({ message: 'No se ha proporcionado ningun mensaje' })
    if (!type) return res.status(400).json({ message: 'No se ha proporcionado ningun tipo' })
    if (type != 'error' || type != 'warning' || type != 'info') return res.status(400).json({ message: 'No se ha proporcionado un tipo correcto. Tipos aceptados: error, warning, info' })

    const data = await Schema.findOne()

    const logs = data.Logs

    const newLog = {
        message,
        type
    }
        
    logs.unshift(newLog)
        
    if (logsArray.length > 10) {
        logs = logs.slice(0, 10)
    }

    if (type === 'error') {
        console.log(message.red)
    } else if (type === 'warning') {
        console.log(message.yellow)
    } else if (type === 'info') {
        console.log(message.blue)
    }

    res.json({
        'succes': true,
        'newLog': newLog
    })
}