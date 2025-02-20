const { Schema, model } = require('mongoose')

let discordSchema = new Schema({
    Client: {
        ID: Number,
        Name: String,
        Avatar: String
    }
})

module.exports = model("discordSchema", discordSchema)