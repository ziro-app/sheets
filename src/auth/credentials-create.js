require('dotenv').config()
const fs = require('fs')

module.exports = fs.writeFileSync('./src/auth/credentials.json', JSON.stringify({
	"private_key": process.env.PRIVATE_KEY,
	"client_email": process.env.CLIENT_EMAIL
}, null, 2))