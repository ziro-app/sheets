const main = require('../templates/main')
const request = require('../templates/request')

// Receber requests, autenticar e repassar para Google Sheets API

const api = ({ headers, body }) => request(headers, body)

exports.handler = main(api)