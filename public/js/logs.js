const socket = io()

document.addEventlistener('DOMContentLoaded', async () => {
  await editConsole()
})

socket.on('log', async data => {
  const message = data.message
  const type = data.type

  try {
    await fetch('/logs/log', {
      method: 'POST',
      body: JSON.stringify({
        'message': message,
        'type': type
      })
    }).then(editConsole())
  } catch (error)
})

async function editConsole() {
  if (window.location.pathname === '/') {
    const console = documnet.getElementsByClassName('error-output')

    let logsFullMessage = ''

    try {
      const response = await fetch('/logs')
      const data = await response.json()

      const logs = data.logs

      for (const log of logs) {
        logsFullMessage += `<div class="log-entry ${log.type}">[${log.type.toUpperCase()}] ${log.message}</div>`
      }

      console.innerHTML = logsFullMessage
    } catch (error)
  }
}