const schema = require('../../schemas/discordSchema.js')

module.exports = async function discordGuilds(req, res) {
    try {
        const clients = require('../../app.js')

        const data = await schema.findOne()

        const clientID = data.clients.find(client => client.selected === true).id

        const client = clients.find(client => client.id === clientID)
    
        let guilds = []
    
        for (const guild of client.guilds.cache) {
            guilds.push({ id: guild.id, name: guild.name, icon: guild.iconURL() })
        }

        res.json({
            'guilds': guilds
        })
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error interno del servidor' })
    }
}