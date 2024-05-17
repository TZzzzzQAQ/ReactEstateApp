import axios from 'axios';

const requestSign = axios.create({
    baseURL: `/api/auth`,
    timeout: 5000,
});

requestSign.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

requestSign.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.log(error)
        return Promise.reject(error)
    }
);

export {requestSign};
