const schema = require('../../schemas/logsSchema.js')

module.exports = async function logs(req, res) {
    const data = await schema.findOne()

    const logs = data.logs.reverse()
    res.json({
        'logs': logs
    })
}