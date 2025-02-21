const schema = require('../../schemas/discordSchema.js')

module.exports = async function discordGuilds(req, res) {
    const clients = require('../../app.js')
    const data = await schema.findOne()
    const clientID = data.clients.find(client => client.selected === true).id
    const client = clients.find(client => client.user.id === clientID)
    
    const guildID = req.params.guildID
    const guild = await client.guilds.cache.get(guildID)

    let channels = []
    
    guild.channels.cache.forEach(channel => {
        channels.push({ 'id': channel.id, 'name': channel.name, 'type': channel.type })
    })

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
}