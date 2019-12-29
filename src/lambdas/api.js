const main = require('../templates/main')
const request = require('../templates/request')

// Receber requests, autenticar e repassar para a API oficial Google Sheets

const api = ({ headers, body, queryStringParameters }) => request(headers, body, queryStringParameters)

exports.handler = main(api)