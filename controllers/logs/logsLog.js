const Schema = require('../../schemas/logsSchema.js')

module.exports = async function logsLog(req, res) {
    const { message, type } = req.body

    if (!log) return res.status(400).json({ message: 'No se ha proporcionado ningun log' })

    if (!log) return res.status(400).json({ message: 'No se ha proporcionado ningun tipo' })

    try {
        const data = await Schema.findOne()

        const logs = data.logs

        const newLog = {
            message,
            type
        }
        
        logs.unshift(newLog)
        
        if (logsArray.length > 10) {
            logs = logs.slice(0, 10)
        }

    } catch (error) {
        console.error(error)
    }

    res.json({
        'succes': true,
        'newLog': newLog
    })
}