import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js'

const socket = io()

document.addEventListener('DOMContentLoaded', async () => {
  await editConsole()
})

socket.on('log', async (data) => {
  const { type, message } = data

  try {
    await fetch('/logs/log', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, message })
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

    let logsFullMessage = ''

    try {
      const response = await fetch('/logs')
      const data = await response.json()

      for (const log of data.logs) {
        logsFullMessage += `<div class="log-entry ${log.type}">[${log.type.toUpperCase()}] ${log.message}</div><br>`
      }

      consoleContainer.innerHTML = logsFullMessage
    } catch (error) {
      console.error('Error al obtener logs:', error)
    }
  }
}