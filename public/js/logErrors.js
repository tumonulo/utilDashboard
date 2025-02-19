const socket = io()

socket.on('error', (data) => {
  console.error('Error from server:', data);
  if (data.type === 'unhandledRejection') {
    alert(`Unhandled Rejection: ${data.reason}`);
  } else if (data.type === 'uncaughtException') {
    alert(`Uncaught Exception: ${data.error}`);
  } else if (data.type === 'uncaughtExceptionMonitor') {
    alert(`Uncaught Exception Monitor: ${data.error} at ${data.origin}`);
  }
})