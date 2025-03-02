const guildSidebar = document.querySelector('.guild-sidebar')

const channelHeader = document.querySelector('.channel-header')
const channelHeaderTitle = document.querySelector('.channel-header-title')
const channelHeaderStatsBoosts = document.querySelector('.channel-header-stats-boosts')
const channelHeaderStatsMembers = document.querySelector('.channel-header-stats-members')
const channelHeaderStatsActiveMembers = document.querySelector('.channel-header-stats-activeMembers')
const channelList = document.querySelector('.channel-list')

const messageHeaderChannel = document.querySelector('.message-header-channel')
const messagesDiv = document.querySelector('.messages')


window.addEventListener('DOMContentLoaded', async () => {
    await loadGuilds()
    await checkRoute()
})


async function loadGuilds() {
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
            window.history.pushState({ guildID: guild.id }, '', `/discord/${guild.id}`)
            })
        }
    } catch (error) {
        console.error('Error al cargar los servidores', error)
    }
}

async function loadGuild() {
    try {
        const pathSplited = window.location.pathname.split('/')
        const guildID = pathSplited[2]
        const response = await fetch(`/discord/${guildID}/data`)
        const data = await response.json()


        channelHeader.style.backgroundImage = `url('${data.banner}')`
        channelHeader.style.backgroundSize = 'cover'
        channelHeader.style.backgroundPosition = 'center'
        channelHeader.style.backgroundRepeat = 'no-repeat'

        channelHeaderTitle.textContent = data.name
        channelHeaderStatsBoosts.textContent = data.boosts
        channelHeaderStatsMembers.textContent = data.members.total
        channelHeaderStatsActiveMembers.textContent = data.members.active

        for (const category of data.categories) {
            const channelIcon = document.createElement('div')
            channelIcon.classList.add('channel')
            channelIcon.textContent = category.name

            channelList.appendChild(channelIcon)
            for (const channel of category.channels) {
                const channelIcon = document.createElement('div')
                channelIcon.classList.add('channel')
                channelIcon.textContent = channel.name

                channelList.appendChild(channelIcon)

                channelIcon.addEventListener('click', () => {
                    window.history.pushState({ guildID: guildID, channel: channel }, '', `/discord/${guildID}/${channel}`);
                })
            }
        }
    } catch (error) {
        console.error('Error al cargar los servidores', error)
    }
}

async function loadChannel() {
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

async function checkRoute() {
    const pathSplited = window.location.pathname.split('/')
    const guildID = pathSplited[2]
    const channelID = pathSplited[3]

    if (guildID) {
        await loadGuild(guildID)

        if (channelID) {
            await loadChannel(guildID, channelID)
        }
    }
}