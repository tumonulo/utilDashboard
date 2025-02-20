const serverSidebar = document.querySelector('.server-sidebar')

window.addEventListener('DOMContentLoaded', async () {
    try {
        const response = await fetch('/discord/guilds')
        const guilds = await response.json()

        for (const guild of guilds) {
            // Crear un elemento div para el ícono del servidor
            const serverIcon = document.createElement('div');
            serverIcon.classList.add('server-icon');

            // Si hay un ícono, usarlo como fondo
            if (guild.guildIcon) {
                serverIcon.style.backgroundImage = `url(${guild.guildIcon})`;
                serverIcon.style.backgroundSize = 'cover'; // Ajustar el ícono al círculo
            } else {
                // Si no hay ícono, usar un color de fondo y las iniciales del nombre
                serverIcon.style.backgroundColor = '#7289da'; // Color de Discord
                serverIcon.textContent = guild.guildName.charAt(0).toUpperCase(); // Primera letra del nombre
            }

            // Agregar el ícono del servidor a la barra lateral
            serverSidebar.appendChild(serverIcon);
        }
    } catch (error) {
        console.log('Error al cargar los servidores')
    }
})