const validResources = ['developerMetadata','sheets','values']

exports.areQueryParamsPresent = queryParams => Object.getOwnPropertyNames(queryParams).length > 0
exports.isAppJsonHeaderNotPresent = headers => headers['content-type'] !== 'application/json'
exports.isApiResourceInvalid = apiResource => !validResources.some(validResource => validResource === apiResource)
exports.validResources = validResources