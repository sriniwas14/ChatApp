import SocketIOClient from 'socket.io-client';

let socket

const getSocketInstance = () => {
    if (!socket){
        socket = SocketIOClient('http://192.168.29.194:2999')
    }
    return socket
}

export default getSocketInstance