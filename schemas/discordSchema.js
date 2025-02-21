const { Schema, model } = require('mongoose')

let discordSchema = new Schema({
    clients: []
})

module.exports = model("discordSchema", discordSchema)