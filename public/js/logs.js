import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js'

const socket = io()

document.addEventListener('DOMContentLoaded', async () => {
  await editConsole()
})

socket.on('log', async data => {
  console.log('b')
  const { color, message } = data

  try {
    await fetch('/logs/log', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ color, message })
    })

    await editConsole()
  } catch (error) {
    console.error('Error al enviar log:', error)
  }
})

async function editConsole() {
  if (window.location.pathname === '/') {
    const consoleContainer = document.querySelector('.error-output')
    if (!consoleContainer) return

    try {
      const response = await fetch('/logs')
      const data = await response.json()

      for (const log of data.logs) {
        const logDiv = document.createElement('div')
        logDiv.classList.add('log-entry')
        logDiv.style.color = log.color
        logDiv.textContent = log.message
        
        consoleContainer.appendChild(logDiv)
      }
    } catch (error) {
      console.error('Error al obtener logs:', error)
    }
  }
}