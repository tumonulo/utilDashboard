const schema = require('../../schemas/logsSchema.js')

module.exports = async function logsLog(req, res) {
    const { message, type } = req.body

    if (!message) return res.status(400).json({ message: 'No se ha proporcionado ningun mensaje' })
    if (!type) return res.status(400).json({ message: 'No se ha proporcionado ningun tipo' })
    if (!['error', 'warning', 'info'].includes(type)) return res.status(400).json({ message: 'No se ha proporcionado un tipo correcto. Tipos aceptados: error, warning, info' })

    const data = await schema.findOne()

    const logs = data.logs

    const newLog = { type, message }
        
    logs.unshift(newLog)
        
    if (logs.length > 10) {
        logs.splice(10)
    }

    await data.save()

    if (type === 'error') {
        console.log(message.red)
    } else if (type === 'warning') {
        console.log(message.yellow)
    } else if (type === 'info') {
        console.log(message.blue)
    }

    res.json({
        'success': true,
        'newLog': newLog
    })
}