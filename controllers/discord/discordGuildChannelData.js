const { ChannelType } = require('discord.js')

const schema = require('../../schemas/discordSchema.js')

module.exports = async function discordGuildChannelData(req, res) {
    const { clients } = require('../../app.js')
    const data = await schema.findOne()
    const clientID = data.clients.find(client => client.selected === true).id
    const client = clients.find(client => client.user.id === clientID)

    const guildID = req.params.guildID
    const guild = client.guilds.cache.get(guildID)

    const channelID = req.params.channelID
    const channel = guild.channels.cache.get(channelID)

    if (channel.type !== ChannelType.GuildText) {
        return res.status(400).json({ error: 'El canal debe ser de tipo texto' })
    }

    const fetchedMessages = await channel.messages.fetch({ limit: 100 })

    const messages = fetchedMessages
        .sort((a, b) => a.createdTimestamp - b.createdTimestamp)
        .map(message => ({
            id: message.id,
            content: message.content,
            author: { username: message.author.username, avatar: message.author.avatarURL() },
            createdTimestamp: message.createdTimestamp
        }))

    res.json({
        id: channel.id,
        name: channel.name,
        messages: messages.length > 0 ? messages : [{ 
             id: 'no-messages', 
            content: 'No hay mensajes en este canal.', 
            author: 'Sistema', 
            createdTimestamp: Date.now() 
        }]
    })
}