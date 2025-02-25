module.exports = {
    name: 'guildDelete',
  
    async execute(guild, client) {
        console.log('A guild has been deleted on bot ' + client.user.username)
    }
}