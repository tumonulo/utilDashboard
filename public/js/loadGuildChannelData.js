const messageHeaderChannel = document.querySelector('.message-header-channel')
const messagesDiv = document.querySelector('.messages')

window.addEventListener('DOMContentLoaded', async () => {
    await loadChannels()
})

async function loadChannels() {
    try {
        const pathSplited = window.location.pathname.split('/')
        const guildID = pathSplited[2]
        const channelID = pathSplited[3]

        const response = await fetch(`/discord/${guildID}/${channelID}/data`)
        const data = await response.json()


        messageHeaderChannel.textContent = data.channel.name

        for (const [id, message] of data.messages) {
            const messageDiv = document.createElement('div')
            messageDiv.classList.add('message')
            messageDiv.textContent = message.content
            messagesDiv.appendChild(messageDiv)
        }
    } catch (error) {
        console.error('Error al cargar los mensajes', error)
    }
}