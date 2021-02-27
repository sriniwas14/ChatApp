const { verifyKey } = require("../utils/tokens")

let pathExceptions = ['login', 'register', 'forgotpassword', 'resetpassword']

const getAuthToken = (req) => {
    const authrorizationHeader = req.headers['authorization']
    if (!authrorizationHeader) return
    const token = authrorizationHeader.split(' ')[1]
    return token
}

exports.authChecker = (req, res, next) => {
    for (path of pathExceptions){
        if (req.path.search(path)!==-1){
            next()
            return
        }
    }
    const token = getAuthToken(req)
    if(!token){ 
        res.status(401).send()
        return
    }  
    const decodedToken = verifyKey(token) 
    if(decodedToken){
        req.token = decodedToken
        next()
    } else {
        res.status(401).send()
    }    
}