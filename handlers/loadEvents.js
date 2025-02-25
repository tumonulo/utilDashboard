const fs = require('node:fs')


module.exports = async function loadEvents(clients) {
    const { io } = require('../app.js')

    for (const client of clients) {
        const folders = fs.readdirSync('./events')

        for (const folder of folders) {
            const files = fs.readdirSync(`./events/${folder}`).filter((file) => file.endsWith(".js"))
    
            for (const file of files) {
                const events = require(`../events/${folder}/${file}`)

                for (const event of events) {
                    try {
                        if (event.rest) {
                            if (event.once) {
                                client.rest.once(event.type, (...args) => event.execute(...args, client))
                            } else {
                                client.rest.on(event.type, (...args) => event.execute(...args, client))
                            }
                        } else {
                            if (event.once) {
                                client.once(event.type, (...args) => event.execute(...args, client))
                            } else {
                                client.on(event.type, (...args) => event.execute(...args, client))
                            }
                        }
                        io.emit('log', { color: 'green', message: `[   EVENTS   ]` + " --- Cargando  " + `  ${event.type}`})
                    } catch (error) {
                        io.emit('log', { color: 'red', message: `[   ERROR   ]` + ` --- Error al cargar el evento ${file}:`, error})
    
                    }    
                }
            }
        }
    }
}