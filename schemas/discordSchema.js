const { Schema, model } = require('mongoose')

let discordSchema = new Schema({
    Client: String
})

module.exports = model("discordSchema", discordSchema)