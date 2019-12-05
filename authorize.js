const { google: { auth } } = require('googleapis')
const keyFile = './credentials.json'
const scopes = 'https://www.googleapis.com/auth/spreadsheets'

const authorize = () => auth.getClient({ keyFile, scopes })

module.exports = authorize