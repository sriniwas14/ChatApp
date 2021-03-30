import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://apps.sriniwasjha.in:2999',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
});

export default instance;
