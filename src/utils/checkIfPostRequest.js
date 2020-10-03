const checkIfPostRequest = {
	before: ({ callback, event: { httpMethod, body } }) => {
		if (httpMethod !== 'POST' && httpMethod !== 'OPTIONS')
			callback(null, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
				},
				statusCode: 400,
				body: JSON.stringify('Only POST requests are allowed')
			})
		else if (httpMethod === 'POST')
			callback(null, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
				},
				statusCode: 400,
				body: JSON.stringify('Body cannot be empty')
			})
		else next()
	}
}

module.exports = checkIfPostRequest