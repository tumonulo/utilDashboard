const Schema = require('../../schemas/discordSchema.js')

module.exports = async function clientEdit(req, res) {
    const data = await Schema.findOne()
    const clients = data.Clients

    res.json({
        'clients': clients
    })
}