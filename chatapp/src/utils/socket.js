import SocketIOClient from 'socket.io-client';

let socket

const getSocketInstance = (username) => {
    if (!socket){
        socket = SocketIOClient(`localhost:2999`)

        socket.emit("handshake", {
            email: username,
        });
    }
    return socket
}

export default getSocketInstance
