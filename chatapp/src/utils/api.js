import axios from 'axios'

export default instance = axios.create({
    baseURL: 'http://localhost',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
});