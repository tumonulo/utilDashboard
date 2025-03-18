const { Schema, model } = require('mongoose')

let userSchema = new Schema({
    id: String
    name: String,
    password: String
})

module.exports = model("userSchema", userSchema)