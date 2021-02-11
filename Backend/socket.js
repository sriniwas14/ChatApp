exports.chatSocket = (app) => {
    const io = require("socket.io")(app, { cors:true, origins: "*" })
    io.sockets.on('connection', (socket) => {
        console.log("New User Connected!")

        socket.on('chat message', (msg) => {
            console.log("MSG : ", msg)
            io.emit('chat message', msg);
        });
    })
}