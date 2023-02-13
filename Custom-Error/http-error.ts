// @ts-ignore
class HttpError extends Error {
    constructor(message: string | undefined) {
        super(message); // add a "message" property
    }
}
module.exports = HttpError;