const schema = require('../../schemas/discordSchema.js')

module.exports = async function discordGuilds(req, res) {
    try {
        const clients = require('../../app.js')
        const data = await schema.findOne()
        const clientID = data.clients.find(client => client.selected === true).id
        const client = clients.find(client => client.user.id === clientID)
    
        const guildID = req.params.guildID
        const guild = await client.guilds.cache.get(guildID)
    
        const channels = guild.channels.cache.map(channel => ({
            id: channel.id,
            name: channel.name,
            type: channel.type
        }))

        const id = guild.id
        const name = guild.name
        const banner = guild.bannerURL()
        const boosts = guild.premiumSubscriptionCount
        const totalMembers = guild.memberCount
        const members = await guild.members.fetch({ withPresences: true })
        const activeMembers = members.filter(member =>
          member.presence?.status === 'online' ||
          member.presence?.status === 'dnd' ||
          member.presence?.status === 'idle'
        )
    
        res.json({
            'id': id,
            'name': name,
            'banner': banner,
            'boosts': boosts,
            'members': { total: totalMembers, active: activeMembers.size },
            'channels': channels
        })
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error interno del servidor' })
    }
}