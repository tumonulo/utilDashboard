const fs = require('node:fs')

module.exports = async function loadEvents(clients) {

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
                        console.log(`[   EVENTS   ]`.underline.green + " --- Cargando  ".green + `  ${event.type}`.green)
                    } catch (error) {
                        console.error(`[   ERROR   ]`.underline.red + ` --- Error al cargar el evento ${file}:`.red, error)
    
                    }    
                }
            }
        }
    }
}