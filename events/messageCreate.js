const clients = require('../app')

for (const client of clients) {
    console.log(client.user.username)
    client.on('messageCreate', async message => {
        console.log(message.content)
    })
}