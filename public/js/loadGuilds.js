const serverSidebar = document.querySelector('.server-sidebar')

window.addEventListener('DOMContentLoaded', async () {
    try {
        const response = await fetch('/discord/guilds')
        const guilds = await response.json()

        for (const guild of guilds) {
            const serverIcon = document.createElement('div')
            serverIcon.classList.add('server-icon')

            if (guild.icon) {
                serverIcon.style.backgroundImage = `url(${guild.icon})`
                serverIcon.style.backgroundSize = 'cover'
            } else {
                serverIcon.style.backgroundColor = '#7289da'
                serverIcon.textContent = guild.name.charAt(0).toUpperCase()
            }

            serverIcon.title = guild.name

            serverSidebar.appendChild(serverIcon)
        }
    } catch (error) {
        console.log('Error al cargar los servidores')
    }
})