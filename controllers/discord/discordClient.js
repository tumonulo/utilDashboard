const Schema = require('../../schemas/discordSchema.js')

module.exports = async function client(req, res) {

    const data = await Schema.findOne()

    const client = data.Client
    
    res.json({
        'client': client
    })
}