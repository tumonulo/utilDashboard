const channelSidebar = document.querySelector('.channel-sidebar')

window.addEventListener('DOMContentLoaded', async () {
    await loadGuildChannels()
})

async funtion loadGuildChannels() {
    try {
        const pathSplited = window.location.pathname.split('/')
        const guildID = pathSplited[0]
        const response = await fetch(`/discord/${channelID}/data`)
        const channels = await response.json()

        for (const channel of channels) {
            const guildIcon = document.createElement('div')
            guildIcon.classList.add('guild')
            
            guildSidebar.appendChild(guildIcon)

            channelIcon.addEventListener('onclick', () => {
                window.location.href = `/discord/${guild.id}`
            })
        }
    } catch (error) {
        console.log('Error al cargar los servidores')
    }
}