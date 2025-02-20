const Schema = require('../../schemas/discordSchema.js')

module.exports = async function discordGuilds(req, res) {
    try {
        const clients = require('../../app.js')

        const data = await Scheme.findOne()

        const clientID = data.Client.ID

        const client = clients.find(client => client.id === clientID)
    
        let guilds = []
    
        for (const guild of client.guilds.cache) {
            let channels = [] 
            for (const channels of guild.chanels.cache) {
                channels.push({ id: channel.id, name: channel.name })
            }
            guilds.push({ id: guild.id, name: guild.name, icon: guild.iconURL(), channels: channels })
        }

        res.json({
            'guilds': guilds
        })
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error interno del servidor' })
    }
}