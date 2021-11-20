const CustomError = require('../../helpers/error/CustomError');
const customErrorHandler = ((error,req, res, next) => {
    let customError = error;
    if(error.name === "SyntaxError") {
        customError = new CustomError("Unexpected Syntax",400);
    }
    if(error.name === "ValidationError"){
        customError = new CustomError(error.message,400); 
    }
    if(error.code === 11000){
        //Dublicate
        customError = new CustomError("Dublicate Key Found : Check Your Input",400);
    }
    if(error.name ==="CastError"){
        customError = new CustomError("Please provide a valid id",400);
    }
    console.log(customError.message,customError.status);
    res
    .status(customError.status || 500)
    .json({
        success:false,
        message:customError.message,
    })
});

module.exports = customErrorHandler;