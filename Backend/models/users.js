const { connection, runQuery } = require('../utils/database');
const { signKey, verifyKey } = require('../utils/tokens')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { search } = require('../routes/users');
const saltRounds = 10;

exports.getUsers = async (username, callback) => {
    let usernameQuery = ''
    if(username){
        usernameQuery = ' WHERE username LIKE ? OR CONCAT(first_name," ", last_name) LIKE ?'
    }

    var result = await runQuery(`SELECT users.username, user_details.first_name, user_details.last_name, user_details.first_name, user_details.profile_pic FROM users INNER JOIN user_details ON users.userId=user_details.userId ${usernameQuery} LIMIT 10`, [ username+'%', username+'%' ])
    if (result.length>0){
        callback(result)
    } else {
        callback(false)
    }
}

exports.getDisconnectedUsers = async (query, username, callback) => {
    let searchQuery = ''
    let queryParameters = [username,username]

    if(query){
        searchQuery = "(ud.first_name LIKE ? OR ud.last_name LIKE ?) AND"
        queryParameters.unshift(query+"%",query+"%")
    }

    var result = await runQuery(`SELECT u.username, ud.first_name, ud.last_name, ud.nickname, ud.phone FROM users u INNER JOIN user_details ud ON u.userId=ud.userId WHERE ${searchQuery} u.username NOT IN (SELECT username FROM participants WHERE roomId IN (SELECT roomId FROM participants WHERE username=?)) AND username!=?`, queryParameters)
    if (result.length>0){
        callback(result)
    } else {
        callback(false)
    }
}

exports.registerUser = (body, callback) => {
    var userId = "u-"+uuidv4()
    
    bcrypt.hash(body.password, saltRounds, (err, passwordHash) => {
        if (err){
            callback({ success: false })
            return
        }
        
        connection.query(`SELECT * FROM users WHERE username=?`,[ body.username ], (error, res, fields) => {
            if (error) throw error;
            if(res.length!==0){
                callback({ success: false, err: "exists"  })
            } else {
                connection.query(`INSERT INTO users VALUES(?,?,?); INSERT INTO user_details VALUES(?,?,?,?,?,?,?,?,?);`,[
                    userId,
                    body.username,
                    passwordHash,
                    userId,
                    body.first_name,
                    body.last_name,
                    body.nickname,
                    body.profile_pic,
                    body.header_pic,
                    body.dob,
                    body.phone,
                    body.bio
                ], function (error, results, fields) {
                    if (error) throw error;
    
                    callback({ success: true })
                });
            }
        })
    })
}

exports.loginUser = async (body, callback) => {
    var result = await runQuery(`SELECT * FROM users INNER JOIN user_details ON users.userId=user_details.userId WHERE username=?`, [ body.username ])

    if(result.length===0){
        callback({ success: false, err: "notexist" })
        return
    }

    var passwordResult = await verifyPassword(body.password, result[0].password)

    delete result[0].userId
    delete result[0].password

    if(passwordResult===true){
        let token = signKey({ ...result[0]})
        callback({ success: true, token }, token)
    } else {
        callback({ success: false, err: "mismatch" })
    }
}

function verifyPassword(password, passwordHash) {
    return new Promise(resolve => {
        bcrypt.compare(password, passwordHash, (err, result) => {
            resolve(result)
        })
    })
}

exports.isValidUser = async (username, callback) => {
    var result = await runQuery(`SELECT * FROM users INNER JOIN user_details ON users.userId=user_details.userId WHERE username=?`, [ username ])
    if (result.length>0){
        callback(true)
    } else {
        callback(false)
    }
}

exports.resetPassword = (data, callback) => {
    bcrypt.hash(data.password, saltRounds, (err, passwordHash) => {
        if (err){
            callback({ success: false })
            return
        }
        runQuery(`UPDATE users SET password=? WHERE username=?`, [ passwordHash, data.username ]).then(result => {
            if(result.affectedRows===1){
                callback({ success: true })
            } else {
                callback({ success: false })
            }
        })        
    })
}
