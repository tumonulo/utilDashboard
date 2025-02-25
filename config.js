require('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 8080,
    MONGODB_URL: process.env.MONGODB_URL,
    TOKEN_DISCORD_BOT_1: process.env.TOKEN_DISCORD_BOT_1,
    TOKEN_DISCORD_BOT_2: process.env.TOKEN_DISCORD_BOT_2
}