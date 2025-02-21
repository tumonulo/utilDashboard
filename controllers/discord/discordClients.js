const schema = require('../../schemas/discordSchema.js')

module.exports = async function clientEdit(req, res) {
    const data = await schema.findOne()
    const clients = data.clients

    res.json({
        'clients': clients
    })
}