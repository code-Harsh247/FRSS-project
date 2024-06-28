import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://frss-project.onrender.com' //backend server runs on port 4000
});

export default instance;
