const { runQuery } = require("../utils/database")

exports.startNewChat = async (data, callback) => {
    // Create a New Room
    let result = await runQuery(`INSERT INTO rooms VALUES(NULL, CURRENT_TIMESTAMP(), ?); SELECT LAST_INSERT_ID() as id`, [ data.participants.from ])
    
    if (result.length>0 && result[0].affectedRows>0){
        const roomId = result[1][0]["id"]
        let participantsResult = await runQuery('INSERT INTO participants VALUES(NULL, ?, ?),(NULL, ?, ?)',[ roomId, data.participants.from, roomId, data.participants.to ])
        
        if(participantsResult.affectedRows>0){
            callback(true, roomId)
        }
    } else {
        callback(false)
    }
    callback(false)
}

exports.saveMessage = async (data) => {
    let result = await runQuery(`INSERT INTO chat_messages VALUES(NULL, ?,?,?,CURRENT_TIMESTAMP())`, [ data.chatId, data.message, data.messageFrom ])
}

exports.acceptChatRequest = async (username, callback) => {
    var result = await runQuery(`SELECT users.username, user_details.first_name, user_details.last_name, user_details.first_name, user_details.profile_pic FROM users INNER JOIN user_details ON users.userId=user_details.userId ${usernameQuery} LIMIT 10`, [ username+'%' ])
    if (result.length>0){
        callback(result)
    } else {
        callback(false)
    }
}

exports.getAllChats = async (from, callback) => {
    let result = await runQuery('SELECT * FROM rooms as rm INNER JOIN participants as p ON rm.id=p.roomId WHERE rm.id IN (SELECT roomId FROM participants WHERE username=?) AND p.username!=?', [from, from])

    if(result.length>0){
        callback(result)
    } else {
        callback(false)
    }
}

exports.chatConnectionExists = async (users, callback)=> {
    let result = await runQuery('SELECT COUNT(*) as participantCount FROM `participants` WHERE username=? OR username=? GROUP BY roomId ORDER BY participantCount DESC LIMIT 1', [users[0], users[1]])

    if(result.length>0){
        callback(true)
    } else {
        callback(false)
    }
}



exports.getChatMessages = async (chatId, username, callback) => {
    let roomsHasThisUser = await runQuery('SELECT * FROM rooms as rm INNER JOIN participants as p ON rm.id=p.roomId WHERE rm.id=? AND p.username=?', [chatId, username])
    
    if(roomsHasThisUser.length<=0) {
        callback(false)
        return
    }
    
    let result = await runQuery('SELECT * FROM `chat_messages` WHERE chatId=? ORDER BY sentAt', [chatId])
    
    if(result.length>0){
        callback(result)
    } else {
        callback(false)
    }
    
}