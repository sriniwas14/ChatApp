const { registerUser, loginUser, isValidUser, resetPassword } = require('../models/users');
const { sendMail } = require('../utils/mail');
const { signKey, verifyKey } = require('../utils/tokens');

const userRoutes = require('express').Router();

userRoutes.get('/', (req, res)=> {
    res.send("Hello World From User")
});

userRoutes.post('/register', (req, res) => {
    registerUser(req.body, (result) => {
        res.send(result)
    })
})

userRoutes.post('/login', (req, res) => {
    loginUser(req.body, (result, token) => {
        res.header("Set-Cookie", `token=${token};`)
        res.send(result)
    })
})

userRoutes.post('/forgotpassword', (req, res) => {
    let username = req.body.username
    isValidUser(username, (result) => {
        if(result) {
            let resetLink = process.env.SITE_URL+"reset_password"+signKey({ username }, "1h")
            sendMail(resetLink, username, (success) => {
                res.send({ success })
            })
        } else {
            res.send({ success: false })
        }
    })
})

userRoutes.post('/resetpassword', (req, res) => {
    let token = req.body.token
    
    if(token) {
        let decodedToken = verifyKey(token)
        if(decodedToken){
            resetPassword({ username: decodedToken. username, password: req.body.password }, (success) => {
                res.send(success)
            })
        } else {
            res.send({ success: false })
        }
    }
})

module.exports = userRoutes;