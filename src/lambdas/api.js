const main = require('../templates/main')
const request = require('../templates/request')

// Receber requests, autenticar e repassar para Google Sheets API

const api = ({ body }) => request(body)

exports.handler = main(api)