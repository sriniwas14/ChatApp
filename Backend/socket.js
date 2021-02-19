const { sendChatRequest, saveMessage } = require("./models/chat")

const sendMessage = (io, chatId, socketId, msg) => {
    if (socketId) {
        // Send Message to `recepient`
        io.to(socketId).emit('chat message', msg)
    }
    saveMessage({
        chatId,
        message: msg.message,
        messageFrom: msg.from,
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

            // Check if users are connected, if they are add `connected: true` to the messages
            if(!msg.connected){
                sendChatRequest({
                    participants: `${msg.recepientId}:${msg.from}`,
                    accepted: false
                }, (success, chatId) => {
                    
                    sendMessage(io, chatId, socketId, msg)
                })
                return
            }
            sendMessage(io, msg.chatId, socketId, msg)
        });
    })
}