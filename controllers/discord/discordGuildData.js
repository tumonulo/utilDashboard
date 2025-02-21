const schema = require('../../schemas/discordSchema.js')

module.exports = async function discordGuilds(req, res) {
    try {
        const clients = require('../../app.js')
        const data = await schema.findOne()
        const clientID = data.clients.find(client => client.selected === true).id
        const client = clients.find(client => client.id === clientID)
    
        const guildID = req.params.guildID
        const guild = await client.guilds.cache.get(guildID)
    
        let channels = []
    
        guild.chhanels.cache.forEach(channel => {
            channels.push({ 'id': channel.id, 'name': channel.name, 'type': channel.type })
        })

        const boosts = guild.premiumSubscriptionCount
        const totalMembers = guild.memberCount
        const members = await guild.members.fetch({ withPresences: true })
        const activeMembers = members.filter(member =>
          member.presence?.status === 'online' ||
          member.presence?.status === 'dnd' ||
          member.presence?.status === 'idle'
        )
    
        res.json({
            'boosts': boosts,
            'members': { total: totalMembers, active: activeMembers.size }
            'channels': channels
        })
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error interno del servidor' })
    }
}