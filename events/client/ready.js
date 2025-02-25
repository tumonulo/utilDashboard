module.exports = [{
    type: 'ready',
    once: 'true',
  
    async execute(client) {
        const { io } = require('../../app.js')
        io.emit('log', { color: 'green', message: `
            ╔════════════════════════════════════╗
            ║        DISCORD BOT CONNECTED       ║
            ╚════════════════════════════════════╝
            Discord Bot Name: ${client.user.username}
            Discord Bot ID: ${client.user.id}
            ` })
            console.log( `
                ╔════════════════════════════════════╗
                ║        DISCORD BOT CONNECTED       ║
                ╚════════════════════════════════════╝
                Discord Bot Name: ${client.user.username}
                Discord Bot ID: ${client.user.id}
                ` )
    }
}]