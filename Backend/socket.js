exports.chatSocket = (app) => {
    const io = require("socket.io")(app, { cors:true, origins: "*" })

    // All the Active Connections Will Be Stored Here
    let connections = {}

    io.sockets.on('connection', (socket) => {
        console.log("New User Connected!")

        // Get User E-mail and create an entry with socketId in the connections object
        socket.on('handshake', data => {
            connections[data.email] = socket.id
        });

        // Send and Receive Messages 
        socket.on('send message', (msg) => {
            const socketId = connections[msg.recepientId] 
            if (socketId) {
                // Send Message to `recepient`
                io.to(socketId).emit('chat message', msg)
            }
            // Implement Save to Database
        });
    })
}