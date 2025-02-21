const { Schema, model } = require('mongoose')

let discordSchema = new Schema({
    Clients: []
})

module.exports = model("discordSchema", discordSchema)