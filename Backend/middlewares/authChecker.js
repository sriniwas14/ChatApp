const { verifyKey } = require("../utils/tokens")

let pathExceptions = ['login', 'register', 'forgotpassword', 'resetpassword']

exports.authChecker = (req, res, next) => {
    for (path of pathExceptions){
        if (req.path.search(path)!==-1){
            next()
            return
        }
    }
    token = req.cookies.token
    if(token) {
        if(verifyKey(token)){
            next()
        } else {
            res.status(401).send()
        }
    }
    
}