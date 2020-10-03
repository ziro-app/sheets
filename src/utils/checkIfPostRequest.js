const isJSON = require('is-json')

const checkIfPostRequest = {
	before: ({ callback, event: { httpMethod, body } }, next) => {
		if (httpMethod !== 'POST' && httpMethod !== 'OPTIONS')
			callback(null, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
				},
				statusCode: 400,
				body: JSON.stringify('Only POST requests are allowed')
			})
		else if (httpMethod === 'POST' && !isJSON(body))
			callback(null, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
				},
				statusCode: 400,
				body: JSON.stringify('Body must be JSON')
			})
		else next()
	}
}

module.exports = checkIfPostRequest