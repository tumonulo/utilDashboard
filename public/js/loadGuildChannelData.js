const messageHeaderChannel = document.querySelector('.message-header-channel')
const messagesDiv = document.querySelector('.messages')

window.addEventListener('DOMContentLoaded', async () => {
    await loadGuildChannelData()
})

async function loadGuildChannelData() {
    try {
        const pathSplited = window.location.pathname.split('/')
        const guildID = pathSplited[2]
        const channelID = pathSplited[3]

        const response = await fetch(`/discord/${guildID}/${channelID}/data`)
        const channel = await response.json()


        messageHeaderChannel.textContent = channel.name

        for (const message of channel.messages) {
            const messageDiv = document.createElement('div')
            messageDiv.classList.add('message')
            messageDiv.textContent = message.content
            messagesDiv.appendChild(messageDiv)
        }
    } catch (error) {
        console.error('Error al cargar los mensajes', error)
    }
}