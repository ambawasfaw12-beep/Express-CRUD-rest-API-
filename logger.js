export const logger = (req, res, next) =>{
    const timeStamp = new Date().toLocaleTimeString()
    console.log(`[${timeStamp}] ${req.method} request to ${req.url}`)
    next()
}