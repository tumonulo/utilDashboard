async function messagesRefresh(message, client) {
    // console.log(client.user.username + ' ' + message.content)

    // io.emit('messagesRefresh', 'datos')
}

module.exports = [{
    type: 'messageCreate',
  
    async execute(message, client) {
        messagesRefresh(message, client)
    }
}, {
    type: 'messageEdit',
  
    async execute(message, client) {
        messagesRefresh(message, client)
    }
}, {
    type: 'messageDelete',
  
    async execute(message, client) {
        messagesRefresh(message, client)
    }
}]