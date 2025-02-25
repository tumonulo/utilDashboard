async function guildsRefresh() {
    console.log(guild.name)
}

module.exports = [{
    type: 'guildCreate',
  
    async execute(guild, client) {
        guildsRefresh()
    }
}, {
    type: 'guildDelete',
  
    async execute(guild, client) {
        guildsRefresh()
    }
}]