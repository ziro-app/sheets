const lambda = require('../templates/lambda')
const request = require('../templates/request')

// Receber requests, autenticar e repassar para a API oficial Google Sheets

const api = ({ headers, body, queryStringParameters }) => request(headers, body, queryStringParameters)

// export
const handler = lambda(api)
module.exports = { handler }