const channelHeader = document.querySelector('.channel-header')
const channelHeaderTitle = document.querySelector('.channel-header-title')
const channelHeaderStatsBoosts = document.querySelector('.channel-header-stats-boosts')
const channelHeaderStatsMembers = document.querySelector('.channel-header-stats-members')
const channelHeaderStatsActiveMembers = document.querySelector('.channel-header-stats-activeMembers')
const channelList = document.querySelector('.channel-list')

window.addEventListener('DOMContentLoaded', async () => {
    await loadGuildData()
})

async function loadGuildData() {
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
                    window.location.pathname = `/discord/${guildID}/${channel.id}`
                })
            }
        }
    } catch (error) {
        console.error('Error al cargar los servidores', error)
    }
}