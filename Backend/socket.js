const { startNewChat, saveMessage, chatConnectionExists, markAsSeen } = require("./models/chat")

const sendMessage = (io, chatId, socketId, msg) => {
    if (socketId) {
        // Send Message to `recepient`
        io.to(socketId).emit('chat message', msg)
    }
    saveMessage({
        chatId,
        message: msg.message,
        messageFrom: msg.messageFrom,  
    })
}

exports.chatSocket = (app) => {
    const io = require("socket.io")(app, { cors:true, origins: "*" })

    // All the Active Connections Will Be Stored Here
    let connections = {}

    io.sockets.on('connection', (socket) => {
        console.log("New User Connected!")

        // Get User E-mail and create an entry with socketId in the connections object
        socket.on('handshake', (data) => {
            console.log("Handshake Successful ")
            connections[data.email] = socket.id
        });

        // Send and Receive Messages 
        socket.on('send message', (msg) => {
            const socketId = connections[msg.recepientId]
            console.log("A")

            // Get Chat Id 
            chatConnectionExists([msg.messageFrom, msg.recepientId], (success )=> {
                // On Failure Create New Chat
                if(!success){
                    startNewChat({
                        participants: { to: msg.recepientId, from: msg.messageFrom },
                        accepted: false
                    }, (success, chatId) => {
                        if(success)
                            sendMessage(io, chatId, socketId, msg)
                    })
                    return
                }
                console.log("E")
                sendMessage(io, msg.chatId, socketId, msg)
            })

            
        });

        socket.on('mark seen', msg => {
            markAsSeen(msg.chatId, success => {
                return
            })
        })
    })
}