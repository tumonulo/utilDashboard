module.exports = async function discordGuilds(req, res) {
    const clients = require('../../app.js');
    
    let guilds = [];

    for (const client of clients) {
        const clientGuilds = client.guilds.cache;

        for (const [guildId, guild] of clientGuilds) {
            const condition = guilds.includes(guildId)

            if (!condition) {
                guilds.push({ guildId: guild.id, name: guild.name, icon: guild.iconURL() })
            }
        }
    }

    res.json({
        'guilds': guilds
    });
}