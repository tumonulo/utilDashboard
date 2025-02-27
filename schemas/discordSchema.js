const { Schema, model } = require('mongoose')

let discordSchema = new Schema({
    clients: Array
})

module.exports = model("discordSchema", discordSchema)