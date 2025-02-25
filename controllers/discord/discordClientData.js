const schema = require('../../schemas/discordSchema.js')

module.exports = async function discordClientData(req, res) {
    const { clients } = require('../../app.js')

    const data = await schema.findOne()

    const clientID = data.clients.find(client => client.selected === true).id

    const client = clients.find(client => client.user.id === clientID)

    const guilds = client.guilds.cache.map(guild => ({
        id: guild.id,
        name: guild.name,
        icon: guild.iconURL()
    }))
    
    res.json({
        'guilds': guilds
    })
}