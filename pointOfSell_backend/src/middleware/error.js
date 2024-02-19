const ErrorHandler = require("../util/errorhandler")

module.exports = (err , req , res , next)=>{
    err.statusCode.err.statusCode || 500
    err.message = err.message || " Internal Server Error"
    
    // wrong mongodb ID error
    if(err.name==="CastError"){
        const message = `resource not foud due to invalid: ${err.path}`
    } 

    // mongoose dublicate key error
    if (err.code===1100) {
        const message = `Dublicate ${Object.keys(err.keyValue)} Error`
        err = new ErrorHandler(message, 409)
    }

    res.status(err.statusCode).json({
        success: false,
        error: err.message
    })
}