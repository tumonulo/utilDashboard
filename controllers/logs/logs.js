const Schema = require('../../schemas/logsSchema.js')

module.exports = async function logs(req, res) {

    const data = await Schema.findOne()

    const logs = data.Logs
    res.json({
        'logs': logs
    })
}