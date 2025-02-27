const fs = require('node:fs')
const path = require('node:path')

module.exports = async function gamesGame(req, res) {
    const { game } = req.params.game
    const gameDir = path.join(process.cwd(), 'public', 'games', game)
    const indexPath = path.join(gameDir, 'index.html')
  
    if (!fs.existsSync(gameDir)) {
      return res.status(404).sendFile(process.cwd() + '/public/html/404.html')
    }
  
    if (!fs.existsSync(indexPath)) {
      return res.status(404).sendFile(process.cwd() + '/public/html/404.html')
    }
  
    res.sendFile(indexPath)
}