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

    const fetchedCategories = await guild.channels.fetch()
    const fetchedCategoriesType = fetchedCategories.filter(channel => channel.type === ChannelType.GuildCategory)
    fetchedCategoriesType.forEach(category => {
        categories.push({
            'id': category.id,
            'name': category.name,
            'position': category.position
        })
    })
    categories.sort((a, b) => a.position - b.position)

    const fetchedChannels = await guild.channels.fetch();
    fetchedChannels.forEach(channel => {
        if (channel.type === ChannelType.GuildText) {
            channels.push({
                'id': channel.id,
                'name': channel.name,
                'type': channel.type,
                'position': channel.position,
                'category': channel.parentId || null
            })
        }
    })
    
    channels.sort((a, b) => a.position - b.position)

    categories.forEach(category => {
        category.channels = channels.filter(channel => channel.category === category.id)
    })
    
    categories.sort((a, b) => a.position - b.position)  

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

    res.json({
        'id': id,
        'name': name,
        'banner': banner,
        'boosts': boosts,
        'members': { total: totalMembers, active: activeMembers.size },
        'categories': categories
    })
}