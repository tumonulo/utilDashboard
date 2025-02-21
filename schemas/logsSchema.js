const { Schema, model } = require('mongoose')

let logsSchema = new Schema({
    logs: Array
})

module.exports = model("logsSchema", logsSchema)