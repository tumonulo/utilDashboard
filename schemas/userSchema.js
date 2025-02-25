const { Schema, model } = require('mongoose')

let userSchema = new Schema({
    name: String,
    password: String
})

module.exports = model("userSchema", userSchema)