const schema = require('../../schemas/discordSchema.js')

module.exports = async function discordData(req, res) {
    const data = await schema.findOne()
    const clients = data.clients

    res.json({
        'clients': clients
    })
}