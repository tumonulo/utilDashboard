const schema = require('../../schemas/discordSchema.js')

module.exports = async function discordGuilds(req, res) {
    const clients = require('../../app.js')
    const data = await schema.findOne()
    const clientID = data.clients.find(client => client.selected === true).id
    const client = clients.find(client => client.user.id === clientID)

    const guildID = req.params.guildID
    const guild = client.guilds.cache.get(guildID)

    const channelID = req.params.channelID
    const channel = guild.channels.cache.get(channelID)

    const messages = await channel.messages.fetch({ limit: 100 })

    res.json({
        'channel': { 'id': channel.id, 'name': channel.name },
        'messages': messages
    })
}