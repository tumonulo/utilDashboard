module.exports = {
    name: 'messageCreate',
  
    async execute(message, client) {
        console.log(client.user.username)
        console.log(message.content)
    }
}
  