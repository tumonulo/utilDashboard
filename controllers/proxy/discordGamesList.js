const fs = require('node:fs')
const path = require('node:path')

module.exports = async function gamesList(req, res) {
    const gamesDir = path.join(process.cwd(), 'public', 'games')

    fs.readdir(gamesDir, (err, files) => {
      if (err) {
        return res.status(500).json({ error: 'No games found' })
      }
  
      const folders = files.filter(file => {
        const filePath = path.join(gamesDir, file)
        return fs.statSync(filePath).isDirectory()
      })
  
      res.json({ games: folders })
    })
}