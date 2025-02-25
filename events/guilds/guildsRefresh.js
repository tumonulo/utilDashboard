async function guildsRefresh(guild, client) {
    console.log(guild.name)
}

module.exports = [{
    type: 'guildCreate',
  
    async execute(guild, client) {
        guildsRefresh(guild, client)
    }
}, {
    type: 'guildDelete',
  
    async execute(guild, client) {
        guildsRefresh(guild, client)
    }
}]