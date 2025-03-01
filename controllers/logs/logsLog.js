const schema = require('../../schemas/logsSchema.js')

module.exports = async function logsLog(req, res) {
    const { message, color } = req.body

    if (!message) return res.status(400).json({ message: 'No se ha proporcionado ningún mensaje' })

    const newColor = color ? color : 'white'

    try {
        const data = await schema.findOne()
        if (!data) {
            return res.status(404).json({ message: 'Documento no encontrado' })
        }

        const logs = data.logs

        const newLog = { color: newColor, message }

        logs.unshift(newLog)

        if (logs.length > 25) {
            logs.splice(25)
        }

        await data.save()

        console.log(message[newColor] || message)

        res.json({
            success: true,
            newLog: newLog
        })

    } catch (error) {
        if (error.name === 'VersionError') {
            const latestData = await schema.findOne()

            if (!latestData) return res.status(404).json({ message: 'Documento no encontrado' })

            latestData.logs.unshift(newLog)
            
            if (latestData.logs.length > 25) {
                latestData.logs.splice(25)
            }

            await latestData.save()

            console.log(message[newColor] || message)

            return res.json({
                success: true,
                newLog: newLog
            })
        }
        return res.status(500).json({ message: 'Error al guardar los logs', error: error.message })
    }
}