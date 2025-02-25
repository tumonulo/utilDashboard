const schema = require('../../schemas/logsSchema.js')

module.exports = async function logsLog(req, res) {
    const { message, color } = req.body

    if (!message) return res.status(400).json({ message: 'No se ha proporcionado ningun mensaje' })
    
    const newColor = color ? color : 'white'

    const data = await schema.findOne()

    const logs = data.logs

    const newLog = { newColor, message }
        
    logs.unshift(newLog)
        
    if (logs.length > 10) {
        logs.splice(10)
    }

    await data.save()

    console.log(message.newColor)

    res.json({
        'success': true,
        'newLog': newLog
    })
}