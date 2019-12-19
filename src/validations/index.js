const validResources = ['developerMetadata','sheets','values']

exports.isApiResourceValid = apiResource => validResources.some(validResource => validResource === apiResource)
exports.validResources = validResources