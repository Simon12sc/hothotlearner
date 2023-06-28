const createError=(statusCode,message)=>{
    let error=new Error();
    error.message=message;
    error.statusCode=statusCode;
    return error;
}


export default createError;
