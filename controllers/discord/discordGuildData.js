const { ChannelType } = require('discord.js')

const schema = require('../../schemas/discordSchema.js')

module.exports = async function discordGuildData(req, res) {
    const { clients } = require('../../app.js')
    const data = await schema.findOne()
    const clientID = data.clients.find(client => client.selected === true).id
    const client = clients.find(client => client.user.id === clientID)
    
    const guildID = req.params.guildID
    const guild = client.guilds.cache.get(guildID)

    let categories = []
    let channels = []

    try {
        const fetchedCategories = await guild.channels.fetch({ type: ChannelType.GuildCategory })
        fetchedCategories.forEach(category => {
            categories.push({
                'id': category.id,
                'name': category.name,
                'position': category.position
            })
        })
        categories.sort((a, b) => a.position - b.position)
    } catch (error) {
        console.error('Error al obtener categorías:', error)
        return res.status(500).json({ error: 'Error al obtener categorías' })
    }

    try {
        const fetchedChannels = await guild.channels.fetch({ type: ChannelType.GuildText })
        fetchedChannels.forEach(channel => {
            channels.push({
                'id': channel.id,
                'name': channel.name,
                'type': channel.type,
                'position': channel.position,
                'category': channel.parent ? channel.parent.id : null
            })
        })

        channels.sort((a, b) => a.position - b.position)

        categories = categories.map(category => {
            const categoryChannels = channels.filter(channel => channel.category === category.id)
            categoryChannels.sort((a, b) => a.position - b.position)

            return {
                ...category,
                channels: categoryChannels
            }
        })
    } catch (error) {
        console.error('Error al obtener canales:', error)
        return res.status(500).json({ error: 'Error al obtener canales' })
    }

    const id = guild.id
    const name = guild.name
    const banner = guild.bannerURL() || ''
    const boosts = guild.premiumSubscriptionCount || 0
    const totalMembers = guild.memberCount || 0
    const members = await guild.members.fetch({ withPresences: true })

    const activeMembers = members.filter(member =>
      member.presence?.status === 'online' ||
      member.presence?.status === 'dnd' ||
      member.presence?.status === 'idle'
    )

    console.log({
        'id': id,
        'name': name,
        'banner': banner,
        'boosts': boosts,
        'members': { total: totalMembers, active: activeMembers.size },
        'categories': categories
    })

    res.json({
        'id': id,
        'name': name,
        'banner': banner,
        'boosts': boosts,
        'members': { total: totalMembers, active: activeMembers.size },
        'categories': categories
    })
}