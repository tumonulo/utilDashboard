const Schema = require('../../schemas/logsSchema.js')

module.exports = async function logs(req, res) {
    try {
        const data = await Schema.findOne()

        const logs = data.logs.join('\n')
    } catch (error) {
        console.error(error)
    }
    res.json({
        'logs': logs
    });
}