import axios from 'axios';

//axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const instance = axios.create({
    baseURL: 'https://api.benajme.com/'
    // headers: {'Access-Control-Allow-Origin': '*'}
});

export default instance;