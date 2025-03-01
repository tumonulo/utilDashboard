const guildSidebar = document.querySelector('.guild-sidebar')

window.addEventListener('DOMContentLoaded', async () => {
    await loadClientData()
})

async function loadClientData() {
    try {
        const response = await fetch('/discord/client/data')
        const data = await response.json()

        for (const guild of data.guilds) {
            const guildIcon = document.createElement('div')
            guildIcon.classList.add('guild')

            if (guild.icon) {
                guildIcon.style.backgroundImage = `url(${guild.icon})`
                guildIcon.style.backgroundSize = 'cover'
            } else {
                guildIcon.style.backgroundColor = '#7289da'
                guildIcon.textContent = guild.name.charAt(0).toUpperCase()
            }

            guildIcon.title = guild.name

            guildSidebar.appendChild(guildIcon)

            guildIcon.addEventListener('click', () => {
                window.location.pathname = `/discord/${guild.id}`
            })
        }
    } catch (error) {
        console.error('Error al cargar los servidores', error)
    }
}