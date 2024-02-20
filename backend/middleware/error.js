const ErrorHander = require('../utils/errorhander')

module.exports = (err ,req , res , next)=>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal server error"

// Wrong mongodb Id error
if(err.name=== "CastError"){
    const message= `Resource not found due to invalid: ${err.path}`
    err = new ErrorHander(message ,400)
}

// Mongoose dublicate key error
if(err.code ===11000){
    const message=`Duplicate ${Object.keys(err.keyValue)} Error`
    err =new ErrorHander(message,409)
    }

// Wrong JWT error
if(err.name==='UnauthorizedError' || "jsonwebTokenError"){
    const message="Invalid Token please login again"
    err = new ErrorHander(message,401)
    }

// JWT Expire error
if(err.name == 'TokenExpaireError'){
    const message ="Your token has expired please login again"
    err = new ErrorHander(message,401)
    }



    res.status(err.statusCode).json({
        success: false,
        error :err.message
    })
}