module.exports = [{
    type: 'ready',
    once: 'true',
  
    async execute(client) {
        const { io } = require('../../app.js')
        io.emit('log', { color: 'green', message: `
            ╔════════════════════════════════════╗\n
            ║        DISCORD BOT CONNECTED       ║\n
            ╚════════════════════════════════════╝\n
            Discord Bot Name: ${client.user.username}\n
            Discord Bot ID: ${client.user.id}
            ` })
    }
}]