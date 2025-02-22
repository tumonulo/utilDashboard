const { ChannelType } = require('discord.js')

const schema = require('../../schemas/discordSchema.js')

module.exports = async function discordGuilds(req, res) {
    const clients = require('../../app.js')
    const data = await schema.findOne()
    const clientID = data.clients.find(client => client.selected === true).id
    const client = clients.find(client => client.user.id === clientID)
    
    const guildID = req.params.guildID
    const guild = client.guilds.cache.get(guildID)

    let categories = []
    let channels = []

    // Obtener todas las categorías
    try {
        const fetchedCategories = await guild.channels.fetch({ type: ChannelType.GuildCategory })
        fetchedCategories.forEach(category => {
            categories.push({
                'id': category.id,
                'name': category.name,
                'position': category.position
            })
        })
        categories.sort((a, b) => a.position - b.position)  // Ordenar por 'position' de las categorías
    } catch (error) {
        console.error('Error al obtener categorías:', error)
        return res.status(500).json({ error: 'Error al obtener categorías' })
    }

    // Obtener todos los canales de texto
    try {
        const fetchedChannels = await guild.channels.fetch({ type: ChannelType.GuildText })
        fetchedChannels.forEach(channel => {
            channels.push({
                'id': channel.id,
                'name': channel.name,
                'type': channel.type,
                'position': channel.position,
                'category': channel.parent ? channel.parent.id : null // Relacionar canal con su categoría
            })
        })

        // Ordenar los canales por 'position' y asignarlos a la categoría correspondiente
        channels.sort((a, b) => a.position - b.position) // Ordenar todos los canales por 'position'

        // Asignar canales a sus categorías
        categories = categories.map(category => {
            const categoryChannels = channels.filter(channel => channel.category === category.id)
            categoryChannels.sort((a, b) => a.position - b.position) // Ordenar los canales dentro de la categoría

            return {
                ...category,
                channels: categoryChannels // Agregamos los canales ordenados a cada categoría
            }
        })
    } catch (error) {
        console.error('Error al obtener canales:', error)
        return res.status(500).json({ error: 'Error al obtener canales' })
    }

    // Obtener otros datos del servidor
    const id = guild.id
    const name = guild.name
    const banner = guild.bannerURL() || '' // Si no hay banner, evitar 'null' o 'undefined'
    const boosts = guild.premiumSubscriptionCount || 0
    const totalMembers = guild.memberCount || 0
    const members = await guild.members.fetch({ withPresences: true })

    // Filtrar miembros activos
    const activeMembers = members.filter(member =>
      member.presence?.status === 'online' ||
      member.presence?.status === 'dnd' ||
      member.presence?.status === 'idle'
    )

    // Verificar que todos los datos están bien formados
    console.log({
        'id': id,
        'name': name,
        'banner': banner,
        'boosts': boosts,
        'members': { total: totalMembers, active: activeMembers.size },
        'categories': categories
    })

    // Enviar la respuesta ordenada
    res.json({
        'id': id,
        'name': name,
        'banner': banner,
        'boosts': boosts,
        'members': { total: totalMembers, active: activeMembers.size },
        'categories': categories
    })
}