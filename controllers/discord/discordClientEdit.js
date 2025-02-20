const Schema = require('../../schemas/discordSchema.js')

module.exports = async function clientEdit(req, res) {
    const clients = require('../../app.js')

    const clientsIDs = clients.map(client => client.id)

    const clientID = req.body.clientID

    if (!clientsIDs.includes(clientID)) return res.status(404).json({ 'succes': false, 'error': 'No cuento con ningun cliente con ese ID' })

        try {
            const data = await Schema.findOne()

            const client = clients.find(client => client.id === clientID)
        
            const newClient = { ID: client.id, Name: client.user.username, Avatar: client.user.avatarURL() }
            
            data.Client = newClient
        
            await data.save()

            res.json({
                'success': true,
                'newClient': newClient
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({ success: false, error: 'Error interno del servidor' })
        }
}