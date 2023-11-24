const { isNil } = require("lodash")

function dataIsNullOrUndefined(...params){
    const response = params.map(param => {
        const response = isNil(param[0]) && {msg: `O campo ${param[1]} é invalido`}
        return response
    })
    return response[0]
}

module.exports = dataIsNullOrUndefined