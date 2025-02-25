module.exports = [{
    type: 'messageCreate',
  
    async execute(message, client) {
        console.log(client.user.username)
        console.log(message.content)
    }
}]