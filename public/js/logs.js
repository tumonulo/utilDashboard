const socket = io()

socket.on('log', async data => {
  console.error('Error from server:', data)
  if (data.type === 'error') {
  
    if (!data.message) return

    try {
      const request = await fetch('/logs/log', () => {
        method: 'POST'
        body: {
          'message': '',
          'type': ''
        }
      })
      const response = await request.json()
    } catch (error) {
      console.log(error)
    }
  }
})