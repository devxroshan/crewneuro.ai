class AppError extends Error {
    constructor(message: string, private statusCode: number){
        super(message);
        Error.captureStackTrace(this,this.constructor);
    }
}

export default AppError;