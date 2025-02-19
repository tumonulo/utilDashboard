const { Schema, model } = require('mongoose')

let logsSchema = new Schema({
    Logs: Array
})

module.exports = model("logsSchema", logsSchema)