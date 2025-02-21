const channelList = document.querySelector('.channel-list')

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
            const channelIcon = document.createElement('div')
            channelIcon.classList.add('channel')
            
            channelList.appendChild(channelIcon)

            channelIcon.addEventListener('onclick', () => {
                window.location.href = `/discord/${guild.id}/${channel.id}`
            })
        }
    } catch (error) {
        console.log('Error al cargar los servidores')
    }
}