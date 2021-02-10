import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://192.168.29.194:2999',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
});

export default instance;