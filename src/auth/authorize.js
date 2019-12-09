const auth = require('googleapis').google.auth
require('./credentials-create.js')
const keyFile = './credentials.json'
const scopes = 'https://www.googleapis.com/auth/spreadsheets'

const authorize = () => auth.getClient({ keyFile, scopes })

module.exports = authorize